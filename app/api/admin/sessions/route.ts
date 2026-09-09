import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/auth";
import { getDb, TABLES } from "@/app/lib/db";
import { hashPassword } from "@/app/lib/participation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function clean(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  let out = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0x20 && code !== 0x7f) out += ch;
  }
  return out.trim().slice(0, max);
}

type Db = NonNullable<ReturnType<typeof getDb>>;

/** 진행 중인 강의를 모두 내립니다 */
async function stopAll(db: Db) {
  await db
    .from(TABLES.sessions)
    .update({ is_running: false })
    .eq("is_running", true);
}

/**
 * POST — 강의 시작 · 재개 · 종료
 *   { name, password }        새 강의를 만들고 시작
 *   { activate: id, password? } 지난 회차를 다시 시작 (비밀번호를 주면 새로 지정)
 *   { stop: true }            지금 강의를 종료
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "저장소가 연결되지 않았습니다." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* 빈 본문 허용 */
  }

  try {
    if (body.stop === true) {
      await stopAll(db);
      return NextResponse.json({ ok: true, running: false });
    }

    const password = clean(body.password, 60);
    const now = new Date().toISOString();

    // 지난 회차를 다시 시작
    if (typeof body.activate === "string") {
      if (!UUID_RE.test(body.activate)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const patch: Record<string, unknown> = {
        is_running: true,
        started_at: now,
      };
      if (password) {
        if (password.length < 4) {
          return NextResponse.json(
            { ok: false, error: "비밀번호는 4자 이상으로 정해주세요." },
            { status: 400 }
          );
        }
        const { hash, salt } = await hashPassword(password);
        patch.password_hash = hash;
        patch.password_salt = salt;
      } else {
        // 비밀번호를 새로 주지 않았다면 예전 것이 남아 있어야 재개할 수 있습니다
        const { data } = await db
          .from(TABLES.sessions)
          .select("password_hash")
          .eq("id", body.activate)
          .maybeSingle();
        if (!data?.password_hash) {
          return NextResponse.json(
            { ok: false, error: "이 회차에는 비밀번호가 없습니다. 새로 정해주세요." },
            { status: 400 }
          );
        }
      }

      await stopAll(db);
      await db.from(TABLES.sessions).update(patch).eq("id", body.activate);
      return NextResponse.json({ ok: true, id: body.activate, running: true });
    }

    // 새 강의 시작
    const name = clean(body.name, 40) || `강의 ${now.slice(0, 10)}`;
    if (password.length < 4) {
      return NextResponse.json(
        { ok: false, error: "참가자용 비밀번호를 4자 이상으로 정해주세요." },
        { status: 400 }
      );
    }
    const { hash, salt } = await hashPassword(password);

    await stopAll(db);
    const { data, error } = await db
      .from(TABLES.sessions)
      .insert({
        name,
        is_running: true,
        started_at: now,
        password_hash: hash,
        password_salt: salt,
      })
      .select("id")
      .single();
    if (error || !data) throw error ?? new Error("insert failed");

    return NextResponse.json({ ok: true, id: data.id, name, running: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "처리하지 못했습니다." },
      { status: 500 }
    );
  }
}

/** PATCH — 회차 이름 바꾸기 */
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ ok: false }, { status: 503 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* noop */
  }

  const id = typeof body.id === "string" ? body.id : "";
  const name = clean(body.name, 40);
  if (!UUID_RE.test(id) || !name) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await db.from(TABLES.sessions).update({ name }).eq("id", id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

/**
 * DELETE — 회차를 통째로 지우거나, 그 안의 참가자 한 명만 지웁니다.
 *   ?session=<id>              회차 삭제 (기록도 함께 사라집니다)
 *   ?session=<id>&visitor=<id> 그 회차의 참가자 한 명만 삭제
 */
export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ ok: false }, { status: 503 });

  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session") ?? "";
  const visitorId = url.searchParams.get("visitor");

  if (!UUID_RE.test(sessionId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    if (visitorId) {
      await db
        .from(TABLES.completions)
        .delete()
        .eq("session_id", sessionId)
        .eq("visitor_id", visitorId);
      await db
        .from(TABLES.visitors)
        .delete()
        .eq("session_id", sessionId)
        .eq("visitor_id", visitorId);
      return NextResponse.json({ ok: true });
    }

    // 표의 외래키가 on delete cascade 라 참가자와 완료 기록도 함께 사라집니다.
    await db.from(TABLES.sessions).delete().eq("id", sessionId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
