"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  subscribe,
  askedSnapshot,
  askedServerSnapshot,
  saveName,
  getVisitorId,
  track,
  syncSession,
  fetchActiveSession,
} from "@/app/lib/tracking";

/**
 * 첫 방문 때 이름을 한 번만 받고, 이후 방문을 집계합니다.
 * 이름을 건너뛰어도 실습은 그대로 진행됩니다.
 *
 * 강사가 새 회차를 열면 예전 진행 상황이 남아 있으면 안 되므로,
 * 화면을 열 때 지금 열린 회차를 확인하고 다르면 비웁니다.
 */
export default function NameGate() {
  const pathname = usePathname();
  const isAdminArea = pathname?.startsWith("/admin") ?? false;

  const asked = useSyncExternalStore(
    subscribe,
    askedSnapshot,
    askedServerSnapshot
  );
  const [value, setValue] = useState("");
  const [reset, setReset] = useState(false);
  const started = useRef(false);

  const open = !isAdminArea && asked !== "1";

  useEffect(() => {
    if (isAdminArea || started.current) return;
    started.current = true;

    (async () => {
      // 회차를 먼저 맞춘 뒤에 방문을 기록합니다.
      // 순서가 바뀌면 지난 회차 기준으로 한 번 기록될 수 있습니다.
      const activeId = await fetchActiveSession();
      if (syncSession(activeId)) setReset(true);

      // 이름을 이미 받은 참가자만 여기서 방문으로 기록합니다.
      // 처음 온 사람은 모달에 답한 뒤에 기록됩니다.
      if (askedSnapshot() !== "1") return;
      getVisitorId();
      void track("visit");
    })();
  }, [isAdminArea]);

  if (!open) return null;

  function submit(name: string) {
    getVisitorId();
    saveName(name.trim().slice(0, 20));
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-sm rounded-[22px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-6 shadow-[var(--s2-shadow-lg)]">
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
            placeholder="예) 박철현"
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
      </div>
    </div>
  );
}
