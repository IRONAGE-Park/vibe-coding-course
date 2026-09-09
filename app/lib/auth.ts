import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vcc_admin";
const SESSION_HOURS = 12;

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
}

/** 길이 노출 없이 상수 시간 비교 */
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createToken(): string {
  const exp = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;

  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  const want = sign(exp);

  if (mac.length !== want.length) return false;
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(want))) return false;

  const expMs = Number(exp);
  return Number.isFinite(expMs) && expMs > Date.now();
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_HOURS * 60 * 60,
};
