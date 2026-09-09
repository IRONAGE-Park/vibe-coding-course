import "server-only";

import { getDb, getActiveSession, startOfTodayKST, TABLES } from "@/app/lib/db";
import { TOTAL_STEPS } from "@/app/lib/steps";
import type { Stats, SessionRow, VisitorRow } from "@/app/lib/stats-types";

const EMPTY: Omit<Stats, "updatedAt"> = {
  connected: false,
  session: null,
  sessions: [],
  totalVisitors: 0,
  todayVisitors: 0,
  totalSteps: TOTAL_STEPS,
  averageDone: 0,
  stepCounts: {},
  visitors: [],
};

/**
 * 관리자 화면에 쓰이는 집계.
 * sessionId 를 주면 그 회차를, 주지 않으면 지금 열려 있는 회차를 봅니다.
 * 저장소가 없거나 실패하면 빈 값을 돌려줍니다.
 */
export async function getStats(sessionId?: string): Promise<Stats> {
  const db = getDb();
  if (!db) return { ...EMPTY, updatedAt: Date.now() };

  try {
    const active = await getActiveSession();
    const target = sessionId ?? active?.id;

    // 회차 목록은 어느 회차를 보든 항상 같이 내려줍니다.
    const { data: sessionRows } = await db
      .from(TABLES.sessions)
      .select("id, name, created_at, is_active")
      .order("created_at", { ascending: false });

    const rows = (sessionRows ?? []) as {
      id: string;
      name: string;
      created_at: string;
      is_active: boolean;
    }[];

    if (!target) {
      return { ...EMPTY, connected: true, updatedAt: Date.now() };
    }

    // 회차별 참가자 수 (목록에 함께 보여줍니다)
    const counts = await Promise.all(
      rows.map((s) =>
        db
          .from(TABLES.visitors)
          .select("visitor_id", { count: "exact", head: true })
          .eq("session_id", s.id)
      )
    );
    const sessions: SessionRow[] = rows.map((s, i) => ({
      id: s.id,
      name: s.name,
      createdAt: s.created_at,
      isActive: s.is_active,
      visitors: counts[i]?.count ?? 0,
    }));

    const current = rows.find((s) => s.id === target) ?? null;

    const [today, steps, people] = await Promise.all([
      db
        .from(TABLES.visitors)
        .select("visitor_id", { count: "exact", head: true })
        .eq("session_id", target)
        .gte("last_seen", startOfTodayKST()),
      db
        .from(TABLES.stepCounts)
        .select("step_id, completions")
        .eq("session_id", target),
      db
        .from(TABLES.visitorProgress)
        .select("visitor_id, name, done, first_seen, last_seen")
        .eq("session_id", target)
        .order("done", { ascending: true })
        .order("first_seen", { ascending: true }),
    ]);

    const firstError = today.error ?? steps.error ?? people.error;
    if (firstError) throw firstError;

    const stepCounts: Record<string, number> = {};
    for (const row of (steps.data ?? []) as {
      step_id: string;
      completions: number;
    }[]) {
      stepCounts[row.step_id] = row.completions;
    }

    // 진행이 느린 사람이 위로 오도록 정렬해서 내려줍니다.
    // 강의 중에 먼저 찾아가야 할 사람이 화면 맨 위에 보이게 하려는 것입니다.
    const visitors: VisitorRow[] = (
      (people.data ?? []) as {
        visitor_id: string;
        name: string | null;
        done: number;
        first_seen: string;
        last_seen: string;
      }[]
    ).map((row) => ({
      id: row.visitor_id,
      name: row.name,
      done: row.done,
      firstSeen: row.first_seen,
      lastSeen: row.last_seen,
    }));

    const averageDone = visitors.length
      ? visitors.reduce((sum, v) => sum + v.done, 0) / visitors.length
      : 0;

    return {
      connected: true,
      session: current
        ? { id: current.id, name: current.name, createdAt: current.created_at }
        : null,
      sessions,
      totalVisitors: visitors.length,
      todayVisitors: today.count ?? 0,
      totalSteps: TOTAL_STEPS,
      averageDone,
      stepCounts,
      visitors,
      updatedAt: Date.now(),
    };
  } catch {
    return { ...EMPTY, updatedAt: Date.now() };
  }
}
