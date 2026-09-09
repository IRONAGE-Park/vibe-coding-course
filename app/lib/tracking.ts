/** 브라우저 쪽 진행 상황 저장 — 클라이언트 컴포넌트에서만 사용합니다 */

const VID = "vcc.vid";
const TEAM = "vcc.team";
const ASKED = "vcc.asked";
const DONE = "vcc.done";

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

/** 팀 이름을 물어봤는지 여부 */
export function askedSnapshot(): string {
  return safeGet(ASKED) ?? "";
}

/** 서버에서는 "물어봤다"로 취급해 첫 렌더에 모달이 스치지 않게 합니다 */
export const askedServerSnapshot = () => "1";

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

export function getTeam(): string {
  return safeGet(TEAM) ?? "";
}

/** 팀 이름 저장. 빈 문자열이면 "건너뛰기"로 기록합니다. */
export function saveTeam(name: string) {
  if (name) safeSet(TEAM, name);
  safeSet(ASKED, "1");
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

/* ── 서버 전송 ──────────────────────────────────────────── */

type TrackEvent = "visit" | "complete" | "uncomplete";

/** 집계 전송 — 실패해도 사용자 화면에는 영향을 주지 않습니다 */
export async function track(event: TrackEvent, stepId?: string) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        team: getTeam(),
        event,
        stepId,
      }),
      keepalive: true,
    });
  } catch {
    /* 오프라인이거나 저장소 미연결 */
  }
}
