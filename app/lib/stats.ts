import "server-only";

import { getDb, startOfTodayKST, TABLES } from "@/app/lib/db";
import { getRunningSession } from "@/app/lib/participation";
import { TOTAL_STEPS, currentStepId } from "@/app/lib/steps";
import {
  FEEDBACK_COLUMNS,
  toFeedbackRow,
  type FeedbackDbRow,
} from "@/app/lib/feedback";
import type {
  FeedbackRow,
  Stats,
  SessionRow,
  StepTime,
  VisitorRow,
} from "@/app/lib/stats-types";

type Db = NonNullable<ReturnType<typeof getDb>>;
type Timing = Pick<Stats, "pageTimes" | "nextClicks" | "stepTimes">;

const NO_TIMING: Timing = { pageTimes: [], nextClicks: [], stepTimes: {} };

const EMPTY: Omit<Stats, "updatedAt"> = {
  connected: false,
  running: false,
  session: null,
  sessions: [],
  totalVisitors: 0,
  todayVisitors: 0,
  totalSteps: TOTAL_STEPS,
  averageDone: 0,
  stepCounts: {},
  visitors: [],
  ...NO_TIMING,
  feedback: [],
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
    const running = await getRunningSession();
    const target = sessionId ?? running?.id;

    // 회차 목록은 어느 회차를 보든 항상 같이 내려줍니다.
    const { data: sessionRows } = await db
      .from(TABLES.sessions)
      .select("id, name, created_at, is_running, started_at")
      .order("created_at", { ascending: false });

    const rows = (sessionRows ?? []) as {
      id: string;
      name: string;
      created_at: string;
      is_running: boolean;
      started_at: string | null;
    }[];

    if (!target) {
      return { ...EMPTY, connected: true, running: false, updatedAt: Date.now() };
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
      isRunning: s.is_running,
      startedAt: s.started_at,
      visitors: counts[i]?.count ?? 0,
    }));

    const current = rows.find((s) => s.id === target) ?? null;

    const [today, steps, people, timing, feedback] = await Promise.all([
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
        .select("visitor_id, name, done, step_ids, first_seen, last_seen")
        .eq("session_id", target)
        .order("done", { ascending: true })
        .order("first_seen", { ascending: true }),
      getTiming(db, target),
      getFeedback(db, target),
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
        step_ids: string[] | null;
        first_seen: string;
        last_seen: string;
      }[]
    ).map((row) => ({
      id: row.visitor_id,
      name: row.name,
      done: row.done,
      currentStep: currentStepId(row.step_ids ?? []),
      firstSeen: row.first_seen,
      lastSeen: row.last_seen,
    }));

    const averageDone = visitors.length
      ? visitors.reduce((sum, v) => sum + v.done, 0) / visitors.length
      : 0;

    return {
      connected: true,
      running: Boolean(running),
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
      ...timing,
      feedback,
      updatedAt: Date.now(),
    };
  } catch {
    return { ...EMPTY, updatedAt: Date.now() };
  }
}

/**
 * 머문 시간 · "다음" 클릭 · 단계별 걸린 시간.
 * supabase/events.sql 을 아직 실행하지 않았으면 뷰가 없어 오류가 납니다.
 * 그래도 기존 진행 현황은 보여야 하므로, 이 부분만 비워서 돌려줍니다.
 */
async function getTiming(db: Db, sessionId: string): Promise<Timing> {
  try {
    const [pages, clicks, steps] = await Promise.all([
      db
        .from(TABLES.pageTimeStats)
        .select("path, visitors, median_ms, avg_ms")
        .eq("session_id", sessionId),
      db
        .from(TABLES.nextClickStats)
        .select("path, target, visitors, median_ms, first_at, median_at")
        .eq("session_id", sessionId),
      db
        .from(TABLES.stepTimeStats)
        .select("step_id, visitors, median_s")
        .eq("session_id", sessionId),
    ]);
    if (pages.error || clicks.error || steps.error) return NO_TIMING;

    const stepTimes: Record<string, StepTime> = {};
    for (const row of (steps.data ?? []) as {
      step_id: string;
      visitors: number;
      median_s: number;
    }[]) {
      stepTimes[row.step_id] = { visitors: row.visitors, medianS: row.median_s };
    }

    return {
      pageTimes: (
        (pages.data ?? []) as {
          path: string;
          visitors: number;
          median_ms: number;
          avg_ms: number;
        }[]
      ).map((row) => ({
        path: row.path,
        visitors: row.visitors,
        medianMs: row.median_ms,
        avgMs: row.avg_ms,
      })),
      nextClicks: (
        (clicks.data ?? []) as {
          path: string;
          target: string;
          visitors: number;
          median_ms: number;
          first_at: string;
          median_at: string;
        }[]
      ).map((row) => ({
        path: row.path,
        target: row.target,
        visitors: row.visitors,
        medianMs: row.median_ms,
        firstAt: row.first_at,
        medianAt: row.median_at,
      })),
      stepTimes,
    };
  } catch {
    return NO_TIMING;
  }
}

/**
 * 참가자가 보낸 문의 · 개선 제안. 새것이 위로 옵니다.
 * supabase/feedback.sql 을 아직 실행하지 않았으면 빈 목록입니다.
 */
async function getFeedback(db: Db, sessionId: string): Promise<FeedbackRow[]> {
  try {
    const { data, error } = await db
      .from(TABLES.feedback)
      .select(FEEDBACK_COLUMNS)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return [];
    return ((data ?? []) as unknown as FeedbackDbRow[]).map(toFeedbackRow);
  } catch {
    return [];
  }
}
