import { NextResponse } from "next/server";
import { getDb, TABLES } from "@/app/lib/db";
import { getParticipation } from "@/app/lib/participation";
import {
  FEEDBACK_COLUMNS,
  FEEDBACK_MAX,
  isFeedbackKind,
  toFeedbackRow,
  type FeedbackDbRow,
} from "@/app/lib/feedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VID_RE = /^[a-zA-Z0-9-]{8,64}$/;
/** 사이트 안의 페이지 주소만 받습니다 — "/", "/setup" 같은 모양 */
const PATH_RE = /^\/[a-z0-9-]{0,40}$/;
/** 페이지 안 영역 id — "setup-3", "setup-check" 같은 모양 */
const SECTION_RE = /^[a-z0-9-]{1,40}$/;
/** 1분에 보낼 수 있는 문의 수. 여러 번 누르거나 도배하는 것을 막습니다. */
const PER_MINUTE = 5;

/** 제어문자를 걸러냅니다. multiline 이면 줄바꿈은 남깁니다. */
function clean(raw: unknown, max: number, multiline = false): string {
  if (typeof raw !== "string") return "";
  let out = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    if ((code >= 0x20 && code !== 0x7f) || (multiline && ch === "\n")) out += ch;
  }
  return out.trim().slice(0, max);
}

/** 진행 중인 강의에 비밀번호를 통과해 들어온 브라우저면 그 회차 id */
async function joinedSession(): Promise<string | null> {
  const part = await getParticipation();
  return part.running && part.joined ? part.sessionId : null;
}

/** GET ?visitor=<id> — 내가 이번 강의에서 보낸 문의 (오래된 것부터) */
export async function GET(req: Request) {
  const visitorId = new URL(req.url).searchParams.get("visitor") ?? "";
  if (!VID_RE.test(visitorId)) {
    return NextResponse.json({ ok: false, items: [] }, { status: 400 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ ok: true, items: [] });

  try {
    const sessionId = await joinedSession();
    if (!sessionId) return NextResponse.json({ ok: true, items: [] });

    const { data, error } = await db
      .from(TABLES.feedback)
      .select(FEEDBACK_COLUMNS)
      .eq("session_id", sessionId)
      .eq("visitor_id", visitorId)
      .order("created_at", { ascending: true })
      .limit(50);
    if (error) throw error;

    return NextResponse.json({
      ok: true,
      items: ((data ?? []) as unknown as FeedbackDbRow[]).map(toFeedbackRow),
    });
  } catch {
    return NextResponse.json({ ok: false, items: [] }, { status: 500 });
  }
}

/**
 * POST — 문의 보내기
 *   { visitorId, name, kind, body, path, sectionId, context }
 * 강의 중에 들어온 참가자만 보낼 수 있습니다.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
  const text = clean(body.body, FEEDBACK_MAX, true);
  const kind = body.kind;
  const path = typeof body.path === "string" ? body.path : "";
  const sectionId =
    typeof body.sectionId === "string" && SECTION_RE.test(body.sectionId)
      ? body.sectionId
      : null;
  const context = clean(body.context, 120) || path;

  if (!VID_RE.test(visitorId) || !text || !isFeedbackKind(kind) || !PATH_RE.test(path)) {
    return NextResponse.json(
      { ok: false, error: "내용을 확인해주세요." },
      { status: 400 }
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "지금은 문의를 받을 수 없습니다." },
      { status: 503 }
    );
  }

  try {
    const sessionId = await joinedSession();
    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "강의에 들어온 뒤에 보낼 수 있습니다." },
        { status: 403 }
      );
    }

    const since = new Date(Date.now() - 60_000).toISOString();
    const { count } = await db
      .from(TABLES.feedback)
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .eq("visitor_id", visitorId)
      .gte("created_at", since);
    if ((count ?? 0) >= PER_MINUTE) {
      return NextResponse.json(
        { ok: false, error: "잠시 뒤에 다시 보내주세요." },
        { status: 429 }
      );
    }

    const now = new Date().toISOString();
    const name = clean(body.name, 20);

    // 참가자 줄이 있어야 외래키가 맞습니다. 이름이 비었으면 기존 이름을 덮지 않습니다.
    await db.from(TABLES.visitors).upsert(
      {
        visitor_id: visitorId,
        session_id: sessionId,
        last_seen: now,
        ...(name ? { name } : {}),
      },
      { onConflict: "visitor_id,session_id" }
    );

    const { data, error } = await db
      .from(TABLES.feedback)
      .insert({
        visitor_id: visitorId,
        session_id: sessionId,
        kind,
        body: text,
        path,
        section_id: sectionId,
        context,
        created_at: now,
      })
      .select(FEEDBACK_COLUMNS)
      .single();
    if (error || !data) throw error ?? new Error("insert failed");

    return NextResponse.json({
      ok: true,
      item: toFeedbackRow(data as unknown as FeedbackDbRow),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "보내지 못했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
