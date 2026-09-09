import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase 연결.
 * 반드시 서버 전용 비밀 키를 씁니다. 이 키는 RLS 를 우회하므로 서버에서만 읽어야 합니다.
 * 환경변수가 없으면 null 을 돌려주고, 호출부는 조용히 집계를 건너뜁니다.
 * (로컬에서 DB 없이 개발할 때 사이트가 죽지 않도록)
 *
 * 이름을 여러 개 받는 이유:
 * - SUPABASE_SECRET_KEY 는 Vercel 마켓플레이스 연동이 넣어주는 이름입니다.
 * - SUPABASE_SERVICE_ROLE_KEY 는 Supabase 대시보드에서 직접 복사할 때의 이름입니다.
 * 둘 다 같은 역할이고, 어느 쪽으로 연결하든 동작해야 합니다.
 */
let cached: SupabaseClient | null | undefined;

export function getDb(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  cached =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;
  return cached;
}

/** 오늘(한국 시간) 0시에 해당하는 시각. 강의가 한국에서 진행되므로 KST 기준입니다. */
export function startOfTodayKST(): string {
  const KST_OFFSET = 9 * 60 * 60 * 1000;
  const kstNow = new Date(Date.now() + KST_OFFSET);
  kstNow.setUTCHours(0, 0, 0, 0);
  return new Date(kstNow.getTime() - KST_OFFSET).toISOString();
}

export const TABLES = {
  sessions: "sessions",
  visitors: "visitors",
  completions: "completions",
  loginAttempts: "login_attempts",
  stepCounts: "step_counts",
  visitorProgress: "visitor_progress",
} as const;

/** 지금 열려 있는 강의 회차. 없으면 하나 만들어 둡니다. */
export async function getActiveSession(): Promise<{
  id: string;
  name: string;
  created_at: string;
} | null> {
  const db = getDb();
  if (!db) return null;

  const { data } = await db
    .from(TABLES.sessions)
    .select("id, name, created_at")
    .eq("is_active", true)
    .maybeSingle();
  if (data) return data;

  const { data: made } = await db
    .from(TABLES.sessions)
    .insert({ name: "첫 번째 강의", is_active: true })
    .select("id, name, created_at")
    .maybeSingle();
  return made ?? null;
}
