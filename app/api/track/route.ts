import { NextResponse } from "next/server";
import { getDb, TABLES } from "@/app/lib/db";
import { isTrackedStep } from "@/app/lib/steps";

export const runtime = "nodejs";

const VID_RE = /^[a-zA-Z0-9-]{8,64}$/;

/** 팀 이름 정리 — 제어문자를 걸러내고 길이를 제한합니다 */
function cleanTeam(raw: unknown): string {
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
  const team = cleanTeam(body.team);
  const stepId = typeof body.stepId === "string" ? body.stepId : "";

  const db = getDb();
  // 저장소가 연결되지 않았어도 화면은 정상 동작해야 합니다
  if (!db) return NextResponse.json({ ok: true, stored: false });

  const now = new Date().toISOString();

  try {
    // 방문자 갱신. 팀 이름이 빈 경우 기존에 저장된 이름을 덮어쓰지 않습니다.
    await db
      .from(TABLES.visitors)
      .upsert(
        { id: visitorId, last_seen: now, ...(team ? { team } : {}) },
        { onConflict: "id" }
      );

    if (event === "complete" && isTrackedStep(stepId)) {
      await db.from(TABLES.completions).upsert(
        {
          visitor_id: visitorId,
          step_id: stepId,
          team: team || null,
          done_at: now,
        },
        { onConflict: "visitor_id,step_id" }
      );
    } else if (event === "uncomplete" && isTrackedStep(stepId)) {
      await db
        .from(TABLES.completions)
        .delete()
        .eq("visitor_id", visitorId)
        .eq("step_id", stepId);
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
