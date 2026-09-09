import { NextResponse } from "next/server";
import { getParticipation } from "@/app/lib/participation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 지금 강의가 진행 중인지, 이 브라우저가 들어와 있는지 알려줍니다.
 * 참가자 화면이 이 값을 보고 강의가 바뀌었으면 자기 진행 상황을 새로 시작합니다.
 */
export async function GET() {
  const p = await getParticipation();
  return NextResponse.json({
    running: p.running,
    id: p.sessionId,
    name: p.sessionName,
    joined: p.joined,
  });
}
