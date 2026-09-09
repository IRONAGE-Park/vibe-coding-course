"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  subscribe,
  askedSnapshot,
  askedServerSnapshot,
  saveName,
  getVisitorId,
  track,
  syncSession,
  resetSnapshot,
  resetServerSnapshot,
} from "@/app/lib/tracking";
import { useParticipation } from "./Participation";

/**
 * 강의가 진행 중일 때만 앞을 막습니다.
 *
 *   강의 없음  → 아무것도 묻지 않습니다. 그냥 읽는 안내서입니다.
 *   강의 중    → 비밀번호를 받고, 그다음 이름을 받습니다.
 *
 * 강사가 새 강의를 열면 예전 진행 상황이 남아 있으면 안 되므로,
 * 회차가 바뀐 것을 확인하면 이름과 완료 기록을 비웁니다.
 */
export default function JoinGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { running, sessionId, sessionName, joined } = useParticipation();

  const isAdminArea = pathname?.startsWith("/admin") ?? false;
  const asked = useSyncExternalStore(
    subscribe,
    askedSnapshot,
    askedServerSnapshot
  );

  // 초기화 여부는 저장소에서 읽습니다.
  // 효과 안에서 곧바로 setState 를 부르면 렌더가 연쇄로 일어납니다.
  const reset =
    useSyncExternalStore(subscribe, resetSnapshot, resetServerSnapshot) === "1";
  const visited = useRef(false);

  // 강의가 바뀌었으면 이 브라우저의 진행 상황을 비웁니다.
  useEffect(() => {
    if (isAdminArea || !running || !sessionId) return;
    syncSession(sessionId);
  }, [isAdminArea, running, sessionId]);

  // 이름까지 받은 참가자의 방문을 한 번 기록합니다.
  useEffect(() => {
    if (isAdminArea || !running || !joined || visited.current) return;
    if (askedSnapshot() !== "1") return;
    visited.current = true;
    getVisitorId();
    void track("visit");
  }, [isAdminArea, running, joined, asked]);

  if (isAdminArea || !running) return null;
  if (joined && asked === "1") return null;

  return joined ? (
    <NameStep reset={reset} />
  ) : (
    <PasswordStep sessionName={sessionName} onDone={() => router.refresh()} />
  );
}

/* ── 1단계: 강의 비밀번호 ──────────────────────────────── */

function PasswordStep({
  sessionName,
  onDone,
}: {
  sessionName: string | null;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onDone();
        return;
      }
      setError(data.error ?? "들어가지 못했습니다.");
    } catch {
      setError("네트워크 오류입니다. 다시 시도해주세요.");
    }
    setBusy(false);
  }

  return (
    <Sheet>
      <p className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--s2-blue)]">
        강의 진행 중
      </p>
      <h2 className="mt-2 text-[19px] font-black tracking-[-0.01em]">
        {sessionName ?? "강의"}에 들어가기
      </h2>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
        강사가 알려준 비밀번호를 넣어주세요. 진행 상황을 기록하려면 필요합니다.
      </p>

      <form onSubmit={submit} className="mt-5">
        <input
          autoFocus
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="강의 비밀번호"
          className="w-full rounded-[14px] border border-[var(--s2-line)] bg-[var(--s2-tint)] px-4 py-3 text-[16px] outline-none focus:border-[var(--s2-blue)]"
        />
        {error && (
          <p className="mt-2.5 text-[13px] font-semibold text-[var(--s2-bad-ink)]">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !value}
          className="mt-3 w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
        >
          {busy ? "확인 중" : "들어가기"}
        </button>
      </form>
    </Sheet>
  );
}

/* ── 2단계: 이름 ───────────────────────────────────────── */

function NameStep({ reset }: { reset: boolean }) {
  const [value, setValue] = useState("");

  function submit(name: string) {
    getVisitorId();
    saveName(name.trim().slice(0, 20));
  }

  return (
    <Sheet>
      <p className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--s2-blue)]">
        WELCOME
      </p>
      <h2 className="mt-2 text-[19px] font-black tracking-[-0.01em]">
        이름을 알려주세요
      </h2>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
        {reset
          ? "새 강의가 시작되어 진행 상황을 새로 시작합니다. 이름을 다시 알려주세요."
          : "진행 상황을 표시하는 데에만 씁니다. 막히는 분을 강사가 빨리 찾아갈 수 있어요."}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="mt-5"
      >
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={20}
          placeholder="예) 홍길동"
          className="w-full rounded-[14px] border border-[var(--s2-line)] bg-[var(--s2-tint)] px-4 py-3 text-[16px] outline-none focus:border-[var(--s2-blue)]"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="mt-3 w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
        >
          시작하기
        </button>
        <button
          type="button"
          onClick={() => submit("")}
          className="mt-2 w-full py-2 text-[13px] font-semibold text-[var(--s2-faint)] hover:text-[var(--s2-blue)]"
        >
          건너뛰기
        </button>
      </form>
    </Sheet>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-sm rounded-[22px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-6 shadow-[var(--s2-shadow-lg)]">
        {children}
      </div>
    </div>
  );
}
