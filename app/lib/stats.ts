import "server-only";

import { getDb, startOfTodayKST, TABLES } from "@/app/lib/db";
import { STEP_IDS, TOTAL_STEPS } from "@/app/lib/steps";
import type { Stats, TeamRow } from "@/app/lib/stats-types";

/** 팀이 완료한 스텝 중 전체 순서상 가장 뒤에 있는 것 */
function furthest(done: string[]): string | null {
  let best: string | null = null;
  let bestIdx = -1;
  for (const id of done) {
    const i = STEP_IDS.indexOf(id);
    if (i > bestIdx) {
      bestIdx = i;
      best = id;
    }
  }
  return best;
}

const EMPTY: Omit<Stats, "updatedAt"> = {
  connected: false,
  totalVisitors: 0,
  todayVisitors: 0,
  totalSteps: TOTAL_STEPS,
  stepCounts: {},
  teams: [],
};

/** 관리자 화면에 쓰이는 집계. 저장소가 없거나 실패하면 빈 값을 돌려줍니다. */
export async function getStats(): Promise<Stats> {
  const db = getDb();
  if (!db) return { ...EMPTY, updatedAt: Date.now() };

  try {
    const [total, today, steps, members, progress] = await Promise.all([
      db.from(TABLES.visitors).select("id", { count: "exact", head: true }),
      db
        .from(TABLES.visitors)
        .select("id", { count: "exact", head: true })
        .gte("last_seen", startOfTodayKST()),
      db.from(TABLES.stepCounts).select("step_id, completions"),
      db.from(TABLES.teamMembers).select("team, members"),
      db.from(TABLES.teamSteps).select("team, done, step_ids"),
    ]);

    const firstError =
      total.error ??
      today.error ??
      steps.error ??
      members.error ??
      progress.error;
    if (firstError) throw firstError;

    const stepCounts: Record<string, number> = {};
    for (const row of (steps.data ?? []) as {
      step_id: string;
      completions: number;
    }[]) {
      stepCounts[row.step_id] = row.completions;
    }

    const byTeam = new Map<string, { done: number; stepIds: string[] }>();
    for (const row of (progress.data ?? []) as {
      team: string;
      done: number;
      step_ids: string[] | null;
    }[]) {
      byTeam.set(row.team, { done: row.done, stepIds: row.step_ids ?? [] });
    }

    const teams: TeamRow[] = ((members.data ?? []) as {
      team: string;
      members: number;
    }[]).map((row) => {
      const p = byTeam.get(row.team);
      return {
        name: row.team,
        members: row.members,
        done: p?.done ?? 0,
        lastStep: p ? furthest(p.stepIds) : null,
      };
    });
    teams.sort((a, b) => b.done - a.done || a.name.localeCompare(b.name));

    return {
      connected: true,
      totalVisitors: total.count ?? 0,
      todayVisitors: today.count ?? 0,
      totalSteps: TOTAL_STEPS,
      stepCounts,
      teams,
      updatedAt: Date.now(),
    };
  } catch {
    return { ...EMPTY, updatedAt: Date.now() };
  }
}
