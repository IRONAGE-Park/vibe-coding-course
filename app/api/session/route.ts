import { NextResponse } from "next/server";
import { getActiveSession } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 지금 열려 있는 강의 회차를 알려줍니다.
 * 참가자 브라우저가 이 값을 보고, 회차가 바뀌었으면 자기 진행 상황을 새로 시작합니다.
 * 회차 이름은 참가자에게 보이지 않으므로 id 만 내려도 되지만,
 * 나중에 화면에 표시할 여지를 남겨 이름도 함께 줍니다.
 */
export async function GET() {
  try {
    const session = await getActiveSession();
    return NextResponse.json({
      id: session?.id ?? null,
      name: session?.name ?? null,
    });
  } catch {
    return NextResponse.json({ id: null, name: null });
  }
}
