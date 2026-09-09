"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  subscribe,
  doneSnapshot,
  doneServerSnapshot,
  parseDone,
  toggleDone,
  track,
} from "@/app/lib/tracking";

/** 스텝 카드 하단의 "완료했어요!" 버튼 */
export default function StepDone({ stepId }: { stepId: string }) {
  const raw = useSyncExternalStore(subscribe, doneSnapshot, doneServerSnapshot);
  const done = useMemo(() => parseDone(raw).has(stepId), [raw, stepId]);

  function onClick() {
    const next = toggleDone(stepId);
    void track(next ? "complete" : "uncomplete", stepId);
  }

  return (
    <div className="mt-1 flex flex-wrap items-center gap-3 border-t border-dashed border-[var(--s2-line)] pt-5">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={done}
        className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-all ${
          done
            ? "bg-[var(--s2-good-bg)] text-[var(--s2-good-ink)] ring-1 ring-[var(--s2-good-line)]"
            : "bg-[var(--s2-blue)] text-white hover:-translate-y-0.5"
        }`}
      >
        {done ? "완료했어요 ✓" : "완료했어요!"}
      </button>
      {done && (
        <span className="text-[13px] text-[var(--s2-faint)]">
          다시 누르면 취소돼요
        </span>
      )}
    </div>
  );
}
