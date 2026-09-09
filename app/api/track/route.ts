import { NextResponse } from "next/server";
import { getDb, getActiveSession, TABLES } from "@/app/lib/db";
import { isTrackedStep } from "@/app/lib/steps";

export const runtime = "nodejs";

const VID_RE = /^[a-zA-Z0-9-]{8,64}$/;

/** 참가자 이름 정리 — 제어문자를 걸러내고 길이를 제한합니다 */
function cleanName(raw: unknown): string {
  if (typeof raw !== "string") return "";
  let out = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    // 제어문자만 걸러냅니다. 한글·이모지 등은 그대로 둡니다.
    if (code >= 0x20 && code !== 0x7f) out += ch;
  }
  return out.trim().slice(0, 20);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
  if (!VID_RE.test(visitorId)) {
    return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
  }

  const event = body.event;
  const name = cleanName(body.name);
  const stepId = typeof body.stepId === "string" ? body.stepId : "";

  const db = getDb();
  // 저장소가 연결되지 않았어도 화면은 정상 동작해야 합니다
  if (!db) {
    return NextResponse.json({ ok: true, stored: false, sessionId: null });
  }

  const now = new Date().toISOString();

  try {
    // 항상 지금 열려 있는 회차에만 기록합니다.
    // 회차가 없으면 기록하지 않습니다. 지난 회차에 섞여 들어가는 것보다 낫습니다.
    const session = await getActiveSession();
    if (!session) {
      return NextResponse.json({ ok: true, stored: false, sessionId: null });
    }

    // 참가자 갱신. 이름이 빈 경우 기존에 저장된 이름을 덮어쓰지 않습니다.
    await db.from(TABLES.visitors).upsert(
      {
        visitor_id: visitorId,
        session_id: session.id,
        last_seen: now,
        ...(name ? { name } : {}),
      },
      { onConflict: "visitor_id,session_id" }
    );

    if (event === "complete" && isTrackedStep(stepId)) {
      await db.from(TABLES.completions).upsert(
        {
          visitor_id: visitorId,
          session_id: session.id,
          step_id: stepId,
          done_at: now,
        },
        { onConflict: "visitor_id,session_id,step_id" }
      );
    } else if (event === "uncomplete" && isTrackedStep(stepId)) {
      await db
        .from(TABLES.completions)
        .delete()
        .eq("visitor_id", visitorId)
        .eq("session_id", session.id)
        .eq("step_id", stepId);
    }

    return NextResponse.json({ ok: true, stored: true, sessionId: session.id });
  } catch {
    return NextResponse.json({ ok: true, stored: false, sessionId: null });
  }
}
