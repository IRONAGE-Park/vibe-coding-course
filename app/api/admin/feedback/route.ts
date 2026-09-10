import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/auth";
import { getDb, TABLES } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PATCH — 문의를 확인했다고 표시하거나 되돌립니다. { id, resolved } */
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

  const id = body.id;
  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    id <= 0 ||
    typeof body.resolved !== "boolean"
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const { error } = await db
      .from(TABLES.feedback)
      .update({ resolved_at: body.resolved ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "처리하지 못했습니다." },
      { status: 500 }
    );
  }
}
