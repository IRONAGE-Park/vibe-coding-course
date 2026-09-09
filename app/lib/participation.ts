import "server-only";

import { scrypt, randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getDb, TABLES } from "@/app/lib/db";

const scryptAsync = promisify(scrypt);

/* ── 참가자 비밀번호 ───────────────────────────────────────
   강사가 강의를 시작할 때 정하는 비밀번호입니다.
   원문은 저장하지 않고 소금을 섞은 scrypt 해시만 남깁니다. */

export async function hashPassword(
  password: string
): Promise<{ hash: string; salt: string }> {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return { hash: key.toString("hex"), salt };
}

export async function verifyPassword(
  password: string,
  hash: string | null,
  salt: string | null
): Promise<boolean> {
  if (!hash || !salt) return false;
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  const stored = Buffer.from(hash, "hex");
  return stored.length === key.length && timingSafeEqual(stored, key);
}

/* ── 입장 쿠키 ─────────────────────────────────────────────
   비밀번호를 맞힌 브라우저에 서명한 쪽지를 하나 줍니다.
   이 쪽지는 특정 회차에만 유효해서, 새 강의가 열리면 자연히 무효가 됩니다. */

export const JOIN_COOKIE = "vcc_join";
const JOIN_HOURS = 24;

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "vcc";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createJoinToken(sessionId: string): string {
  const exp = String(Date.now() + JOIN_HOURS * 60 * 60 * 1000);
  const payload = `${sessionId}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyJoinToken(
  token: string | undefined,
  sessionId: string
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [id, exp, mac] = parts;
  if (id !== sessionId) return false;

  const want = sign(`${id}.${exp}`);
  if (mac.length !== want.length) return false;
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(want))) return false;

  const expMs = Number(exp);
  return Number.isFinite(expMs) && expMs > Date.now();
}

export const JOIN_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: JOIN_HOURS * 60 * 60,
};

/* ── 지금 강의가 열려 있는가 ───────────────────────────── */

export type RunningSession = {
  id: string;
  name: string;
  password_hash: string | null;
  password_salt: string | null;
};

/** 진행 중인 강의. 없으면 null 이고, 그게 기본 상태입니다. */
export async function getRunningSession(): Promise<RunningSession | null> {
  const db = getDb();
  if (!db) return null;

  const { data } = await db
    .from(TABLES.sessions)
    .select("id, name, password_hash, password_salt")
    .eq("is_running", true)
    .maybeSingle();

  return data ?? null;
}

export type Participation = {
  /** 지금 강의가 진행 중인지 */
  running: boolean;
  sessionId: string | null;
  sessionName: string | null;
  /** 이 브라우저가 비밀번호를 통과했는지 */
  joined: boolean;
};

export const NOT_RUNNING: Participation = {
  running: false,
  sessionId: null,
  sessionName: null,
  joined: false,
};

/** 이 요청을 보낸 브라우저가 지금 강의에 들어와 있는지 */
export async function getParticipation(): Promise<Participation> {
  try {
    const session = await getRunningSession();
    if (!session) return NOT_RUNNING;

    const token = (await cookies()).get(JOIN_COOKIE)?.value;
    return {
      running: true,
      sessionId: session.id,
      sessionName: session.name,
      joined: verifyJoinToken(token, session.id),
    };
  } catch {
    // 저장소가 막혀 있어도 안내서는 읽을 수 있어야 합니다
    return NOT_RUNNING;
  }
}
