import { NextResponse } from "next/server";
import {
  getRunningSession,
  verifyPassword,
  createJoinToken,
  JOIN_COOKIE,
  JOIN_COOKIE_OPTS,
} from "@/app/lib/participation";
import { getDb, TABLES } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILS = 20;
const WINDOW_MS = 10 * 60 * 1000;

/** 참가자가 강의 비밀번호를 넣고 들어옵니다 */
export async function POST(req: Request) {
  const session = await getRunningSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "지금 진행 중인 강의가 없습니다." },
      { status: 409 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const db = getDb();

  // 참가자용이라 관리자보다 넉넉하게 두되, 무한 시도는 막습니다.
  let fails = 0;
  if (db) {
    try {
      const { data } = await db
        .from(TABLES.loginAttempts)
        .select("fails, window_start")
        .eq("ip", `join:${ip}`)
        .maybeSingle();
      if (data) {
        const fresh =
          Date.now() - new Date(data.window_start).getTime() < WINDOW_MS;
        fails = fresh ? data.fails : 0;
      }
      if (fails >= MAX_FAILS) {
        return NextResponse.json(
          { ok: false, error: "시도가 너무 많습니다. 10분 뒤에 다시 해주세요." },
          { status: 429 }
        );
      }
    } catch {
      /* 집계 실패가 입장을 막지는 않습니다 */
    }
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    /* 빈 비밀번호로 처리 */
  }

  const ok = await verifyPassword(
    password,
    session.password_hash,
    session.password_salt
  );

  if (!ok) {
    if (db) {
      try {
        await db.from(TABLES.loginAttempts).upsert(
          {
            ip: `join:${ip}`,
            fails: fails + 1,
            ...(fails === 0 ? { window_start: new Date().toISOString() } : {}),
          },
          { onConflict: "ip" }
        );
      } catch {
        /* noop */
      }
    }
    return NextResponse.json(
      { ok: false, error: "비밀번호가 맞지 않습니다." },
      { status: 401 }
    );
  }

  if (db) {
    try {
      await db.from(TABLES.loginAttempts).delete().eq("ip", `join:${ip}`);
    } catch {
      /* noop */
    }
  }

  const res = NextResponse.json({ ok: true, sessionId: session.id });
  res.cookies.set(JOIN_COOKIE, createJoinToken(session.id), JOIN_COOKIE_OPTS);
  return res;
}
