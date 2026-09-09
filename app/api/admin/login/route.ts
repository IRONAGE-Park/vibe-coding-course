import { NextResponse } from "next/server";
import {
  passwordMatches,
  createToken,
  ADMIN_COOKIE,
  COOKIE_OPTS,
} from "@/app/lib/auth";
import { getDb, TABLES } from "@/app/lib/db";

export const runtime = "nodejs";

const MAX_FAILS = 10;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "관리자 비밀번호가 서버에 설정되지 않았습니다." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const db = getDb();

  // 공용 비밀번호의 약점을 줄이기 위한 시도 횟수 제한.
  // 창이 지났으면 0부터 다시 셉니다.
  let fails = 0;
  if (db) {
    try {
      const { data } = await db
        .from(TABLES.loginAttempts)
        .select("fails, window_start")
        .eq("ip", ip)
        .maybeSingle();

      if (data) {
        const fresh = Date.now() - new Date(data.window_start).getTime() < WINDOW_MS;
        fails = fresh ? data.fails : 0;
      }
      if (fails >= MAX_FAILS) {
        return NextResponse.json(
          { ok: false, error: "시도가 너무 많습니다. 10분 뒤에 다시 해주세요." },
          { status: 429 }
        );
      }
    } catch {
      /* 집계 실패가 로그인을 막지는 않습니다 */
    }
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    /* 빈 비밀번호로 처리 */
  }

  if (!passwordMatches(password)) {
    if (db) {
      try {
        await db.from(TABLES.loginAttempts).upsert(
          {
            ip,
            fails: fails + 1,
            // 창이 새로 열린 경우에만 시작 시각을 갱신합니다
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
      await db.from(TABLES.loginAttempts).delete().eq("ip", ip);
    } catch {
      /* noop */
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(), COOKIE_OPTS);
  return res;
}
