import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/auth";
import { getStats } from "@/app/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json(await getStats());
}
