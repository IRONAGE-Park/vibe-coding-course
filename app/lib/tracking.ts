/** 브라우저 쪽 진행 상황 저장 — 클라이언트 컴포넌트에서만 사용합니다 */

const VID = "vcc.vid";
const NAME = "vcc.name";
const ASKED = "vcc.asked";
const DONE = "vcc.done";
const SESSION = "vcc.session";
const RESET = "vcc.reset";

const CHANGED = "vcc:changed";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* 시크릿 모드 등에서 저장이 막혀도 화면은 계속 동작합니다 */
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGED));
}

/* ── 강의 회차 ──────────────────────────────────────────── */

/**
 * 강사가 새 회차를 열면 참가자 화면도 새로 시작해야 합니다.
 * 저장해 둔 회차와 지금 열린 회차가 다르면 이름과 완료 기록을 비웁니다.
 * 처음 방문(저장된 회차 없음)은 초기화할 것이 없으므로 그대로 둡니다.
 * @returns 초기화가 일어났으면 true
 */
export function syncSession(activeId: string | null): boolean {
  if (!activeId) return false;

  const known = safeGet(SESSION);
  if (known === activeId) return false;

  safeSet(SESSION, activeId);
  if (!known) return false;

  try {
    localStorage.removeItem(DONE);
    localStorage.removeItem(NAME);
    localStorage.removeItem(ASKED);
    // 안내 문구를 바꾸기 위한 표시. 이름을 다시 받으면 지웁니다.
    localStorage.setItem(RESET, "1");
  } catch {
    /* 저장이 막힌 환경 */
  }
  notify();
  return true;
}

/** 지금 열려 있는 회차를 서버에 물어봅니다 */
export async function fetchActiveSession(): Promise<string | null> {
  try {
    const res = await fetch("/api/session", { cache: "no-store" });
    const data = await res.json();
    return typeof data?.id === "string" ? data.id : null;
  } catch {
    return null;
  }
}

/* ── React 외부 저장소 구독 ─────────────────────────────── */

/** useSyncExternalStore 용 구독. 같은 탭의 변경과 다른 탭의 변경을 모두 받습니다. */
export function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** 완료한 스텝 목록의 원본 문자열. 값이 같으면 문자열도 같아 재렌더가 생기지 않습니다. */
export function doneSnapshot(): string {
  return safeGet(DONE) ?? "";
}

export const doneServerSnapshot = () => "";

/** 이름을 물어봤는지 여부 */
export function askedSnapshot(): string {
  return safeGet(ASKED) ?? "";
}

/** 서버에서는 "물어봤다"로 취급해 첫 렌더에 모달이 스치지 않게 합니다 */
export const askedServerSnapshot = () => "1";

/** 방금 새 강의가 열려 초기화됐는지 */
export function resetSnapshot(): string {
  return safeGet(RESET) ?? "";
}

export const resetServerSnapshot = () => "";

/** 내가 적어둔 이름 */
export function nameSnapshot(): string {
  return safeGet(NAME) ?? "";
}

export const nameServerSnapshot = () => "";

export function parseDone(raw: string): Set<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? new Set(parsed.filter((x): x is string => typeof x === "string"))
      : new Set();
  } catch {
    return new Set();
  }
}

/* ── 값 읽기 · 쓰기 ─────────────────────────────────────── */

function randomId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    /* http 환경 등에서 막히면 아래 대체 방식 */
  }
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function getVisitorId(): string {
  let id = safeGet(VID);
  if (!id) {
    id = randomId();
    safeSet(VID, id);
  }
  return id;
}

export function getName(): string {
  return safeGet(NAME) ?? "";
}

/** 참가자 이름 저장. 빈 문자열이면 "건너뛰기"로 기록합니다. */
export function saveName(name: string) {
  if (name) safeSet(NAME, name);
  safeSet(ASKED, "1");
  try {
    localStorage.removeItem(RESET);
  } catch {
    /* noop */
  }
  notify();
}

export function toggleDone(stepId: string): boolean {
  const set = parseDone(doneSnapshot());
  const next = !set.has(stepId);

  if (next) set.add(stepId);
  else set.delete(stepId);

  safeSet(DONE, JSON.stringify([...set]));
  notify();
  return next;
}

/* ── 페이지에 머문 시간 ─────────────────────────────────── */

/**
 * 탭이 보이는 동안만 셉니다. 다른 탭에 가 있던 시간은 빠지고,
 * 이 탭을 띄워둔 채 옆 창(터미널 등)에서 따라 하던 시간은 들어갑니다.
 * total 은 이 페이지에 들어온 뒤 전체, sent 는 그중 이미 서버에 보낸 만큼입니다.
 */
const clock = { total: 0, sent: 0, since: null as number | null };

/** 새 페이지에 들어왔을 때 0부터 다시 셉니다 */
export function startPageClock() {
  clock.total = 0;
  clock.sent = 0;
  clock.since = document.hidden ? null : performance.now();
}

/** 탭으로 돌아왔을 때 다시 셉니다 */
export function resumePageClock() {
  clock.since ??= performance.now();
}

/** 이 페이지에 들어온 뒤 지금까지 머문 시간(ms) */
export function pageElapsed(): number {
  return clock.total + (clock.since === null ? 0 : performance.now() - clock.since);
}

/** 시계를 멈추고, 아직 보내지 않은 만큼을 돌려줍니다 */
export function takeUnsentPageTime(): number {
  clock.total = pageElapsed();
  clock.since = null;
  const unsent = clock.total - clock.sent;
  clock.sent = clock.total;
  return unsent;
}

/* ── 서버 전송 ──────────────────────────────────────────── */

type TrackEvent = "visit" | "complete" | "uncomplete";
type TimeEvent = "page" | "next";

/** 집계 전송 — 실패해도 사용자 화면에는 영향을 주지 않습니다 */
export async function track(event: TrackEvent, stepId?: string) {
  await send({ event, stepId });
}

/**
 * 머문 시간 전송.
 *   page : 이 페이지에서 탭을 보고 있던 시간 (탭을 떠날 때 · 다른 페이지로 갈 때)
 *   next : 페이지 아래 "다음" 을 누름. target 은 넘어가는 곳입니다.
 */
export async function trackTime(
  event: TimeEvent,
  path: string,
  ms: number,
  target?: string
) {
  await send({ event, path, target, ms: Math.round(ms) });
}

async function send(detail: Record<string, unknown>) {
  try {
    // keepalive 라서 페이지를 닫는 순간에 보낸 요청도 끝까지 갑니다.
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        name: getName(),
        ...detail,
      }),
      keepalive: true,
    });
    // 응답에 실린 회차가 내가 알던 것과 다르면 여기서도 맞춰둡니다.
    const data = await res.json().catch(() => null);
    if (data && typeof data.sessionId === "string") syncSession(data.sessionId);
  } catch {
    /* 오프라인이거나 저장소 미연결 */
  }
}
