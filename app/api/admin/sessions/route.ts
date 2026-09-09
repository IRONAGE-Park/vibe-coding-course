import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/auth";
import { getDb, TABLES } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function cleanName(raw: unknown): string {
  if (typeof raw !== "string") return "";
  let out = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0x20 && code !== 0x7f) out += ch;
  }
  return out.trim().slice(0, 40);
}

/** 회차를 하나만 active 로 만듭니다 */
async function activate(
  db: NonNullable<ReturnType<typeof getDb>>,
  id: string
) {
  await db
    .from(TABLES.sessions)
    .update({ is_active: false })
    .eq("is_active", true);
  await db.from(TABLES.sessions).update({ is_active: true }).eq("id", id);
}

/** POST — 새 회차 열기, 또는 기존 회차를 다시 열기 */
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
    // 기존 회차를 다시 여는 경우
    if (typeof body.activate === "string") {
      if (!UUID_RE.test(body.activate)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      await activate(db, body.activate);
      return NextResponse.json({ ok: true, id: body.activate });
    }

    // 새 회차를 여는 경우
    const name =
      cleanName(body.name) ||
      `강의 ${new Date().toISOString().slice(0, 10)}`;

    const { data, error } = await db
      .from(TABLES.sessions)
      .insert({ name, is_active: false })
      .select("id")
      .single();
    if (error || !data) throw error ?? new Error("insert failed");

    await activate(db, data.id);
    return NextResponse.json({ ok: true, id: data.id, name });
  } catch {
    return NextResponse.json(
      { ok: false, error: "회차를 바꾸지 못했습니다." },
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
  const name = cleanName(body.name);
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
      // 참가자 한 명만 제거. 완료 기록도 함께 지웁니다.
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

    // 마지막 남은 회차는 지우지 않습니다. 지우면 기록할 곳이 없어집니다.
    const { count } = await db
      .from(TABLES.sessions)
      .select("id", { count: "exact", head: true });
    if ((count ?? 0) <= 1) {
      return NextResponse.json(
        { ok: false, error: "마지막 회차는 지울 수 없습니다. 새 회차를 먼저 여세요." },
        { status: 400 }
      );
    }

    const { data: victim } = await db
      .from(TABLES.sessions)
      .select("is_active")
      .eq("id", sessionId)
      .maybeSingle();

    // 표의 외래키가 on delete cascade 라 방문자와 완료 기록도 함께 사라집니다.
    await db.from(TABLES.sessions).delete().eq("id", sessionId);

    // 열려 있던 회차를 지웠다면, 가장 최근 회차를 대신 엽니다.
    if (victim?.is_active) {
      const { data: next } = await db
        .from(TABLES.sessions)
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (next) await activate(db, next.id);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
