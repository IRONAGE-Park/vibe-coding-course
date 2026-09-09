import { NextResponse } from "next/server";
import { ADMIN_COOKIE, COOKIE_OPTS } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
  return res;
}
