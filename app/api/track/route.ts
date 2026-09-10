import { NextResponse } from "next/server";
import { getDb, TABLES } from "@/app/lib/db";
import { getParticipation } from "@/app/lib/participation";
import { isTrackedStep } from "@/app/lib/steps";

export const runtime = "nodejs";

const VID_RE = /^[a-zA-Z0-9-]{8,64}$/;
/** 사이트 안의 페이지 주소만 받습니다 — "/", "/setup" 같은 모양 */
const PATH_RE = /^\/[a-z0-9-]{0,40}$/;
/** 한 번에 보내는 머문 시간의 상한. 탭을 켜둔 채 자리를 비운 기록이 한없이 커지지 않게 합니다. */
const MAX_MS = 3 * 60 * 60 * 1000;

function cleanMs(raw: unknown): number | null {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw < 0) return null;
  return Math.min(Math.round(raw), MAX_MS);
}

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
    // 진행 중인 강의에, 비밀번호를 통과한 브라우저만 기록합니다.
    // 화면에서 버튼을 숨기는 것만으로는 API 를 직접 부르는 것을 막지 못합니다.
    const part = await getParticipation();
    if (!part.running || !part.joined || !part.sessionId) {
      return NextResponse.json({
        ok: true,
        stored: false,
        sessionId: part.sessionId,
        running: part.running,
        joined: part.joined,
      });
    }
    const session = { id: part.sessionId };

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
    } else if (event === "page" || event === "next") {
      const path = typeof body.path === "string" ? body.path : "";
      const target = typeof body.target === "string" ? body.target : "";
      const ms = cleanMs(body.ms);
      const valid =
        PATH_RE.test(path) &&
        ms !== null &&
        (event === "page" || PATH_RE.test(target));

      if (valid) {
        await db.from(TABLES.events).insert({
          visitor_id: visitorId,
          session_id: session.id,
          kind: event,
          path,
          target: event === "next" ? target : null,
          duration_ms: ms,
          at: now,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      stored: true,
      sessionId: session.id,
      running: true,
      joined: true,
    });
  } catch {
    return NextResponse.json({ ok: true, stored: false, sessionId: null });
  }
}
