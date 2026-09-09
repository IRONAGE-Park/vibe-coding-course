"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  subscribe,
  doneSnapshot,
  doneServerSnapshot,
  parseDone,
  toggleDone,
  track,
} from "@/app/lib/tracking";
import {
  stepStateOf,
  nextStepId,
  stepInfo,
  TOTAL_STEPS,
} from "@/app/lib/steps";
import { useTracking } from "./Participation";

/**
 * 스텝 카드의 상태(완료 · 진행 중 · 잠김)를 입혀 감싸는 껍데기.
 *
 * 실습은 순서대로 하는 것을 전제로 합니다.
 * - 끝낸 단계는 접어서 흐리게 두어 화면이 조용해지고,
 * - 지금 할 단계만 펼쳐져 눈에 들어오고,
 * - 아직 차례가 아닌 단계는 완료 버튼을 잠급니다.
 *
 * 접힌 단계도 "펼쳐 보기" 로 언제든 읽을 수 있습니다. 내용을 막지는 않습니다.
 */
export default function StepShell({
  stepId,
  header,
  children,
}: {
  stepId: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const tracking = useTracking();
  const raw = useSyncExternalStore(subscribe, doneSnapshot, doneServerSnapshot);
  const done = useMemo(() => parseDone(raw), [raw]);

  // 강의 중이 아니면 순서를 걸 이유가 없습니다.
  // 그냥 읽는 안내서이므로 모든 단계를 평범하게 펼쳐 둡니다.
  const state = tracking ? stepStateOf(stepId, done) : "current";

  const [expanded, setExpanded] = useState(false);
  const open = state === "current" || expanded;

  function onComplete() {
    const next = toggleDone(stepId);
    void track(next ? "complete" : "uncomplete", stepId);

    if (next) {
      // 방금 끝냈으면 접고, 다음 단계로 시선을 옮겨줍니다.
      setExpanded(false);
      const after = nextStepId(stepId);
      if (after) {
        window.requestAnimationFrame(() => {
          document
            .getElementById(after)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } else {
      // 취소했으면 다시 펼쳐서 이어서 볼 수 있게 합니다.
      setExpanded(true);
    }
  }

  const tone =
    state === "current"
      ? "border-[var(--s2-line)] bg-[var(--s2-card)] shadow-[var(--s2-shadow-lg)]"
      : "border-[var(--s2-divider)] bg-[var(--s2-tint)]";

  return (
    <section
      id={stepId}
      data-step-state={state}
      className={`scroll-mt-20 rounded-[24px] border p-6 transition-all md:p-9 ${tone}`}
    >
      <div className={state === "current" ? "" : "opacity-55"}>{header}</div>

      {open ? (
        <div className={`mt-4 flex flex-col gap-5 ${state === "current" ? "" : "opacity-75"}`}>
          {children}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 text-[13px] font-semibold text-[var(--s2-faint)] hover:text-[var(--s2-blue)]"
        >
          펼쳐 보기
        </button>
      )}

      {tracking && (
        <Footer
          state={state}
          stepId={stepId}
          open={open}
          onComplete={onComplete}
          onCollapse={() => setExpanded(false)}
        />
      )}
    </section>
  );
}

function Footer({
  state,
  stepId,
  open,
  onComplete,
  onCollapse,
}: {
  state: "done" | "current" | "locked";
  stepId: string;
  open: boolean;
  onComplete: () => void;
  onCollapse: () => void;
}) {
  const info = stepInfo(stepId);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-dashed border-[var(--s2-line)] pt-5">
      {state === "locked" ? (
        <>
          <span className="rounded-full bg-[var(--s2-tint)] px-4 py-2.5 text-[13.5px] font-bold text-[var(--s2-faint)] ring-1 ring-[var(--s2-line)]">
            앞 단계를 먼저 끝내주세요
          </span>
          <span className="text-[12.5px] text-[var(--s2-faint)]">
            순서대로 해야 막히지 않습니다
          </span>
        </>
      ) : (
        <button
          type="button"
          onClick={onComplete}
          aria-pressed={state === "done"}
          className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-all ${
            state === "done"
              ? "bg-[var(--s2-good-bg)] text-[var(--s2-good-ink)] ring-1 ring-[var(--s2-good-line)]"
              : "bg-[var(--s2-blue)] text-[var(--s2-on-blue)] hover:-translate-y-0.5"
          }`}
        >
          {state === "done" ? "완료했어요 ✓" : "완료했어요!"}
        </button>
      )}

      {state === "done" && (
        <span className="text-[12.5px] text-[var(--s2-faint)]">
          다시 누르면 취소돼요
        </span>
      )}

      <span className="ml-auto flex items-center gap-3">
        {state !== "current" && open && (
          <button
            type="button"
            onClick={onCollapse}
            className="text-[12.5px] font-semibold text-[var(--s2-faint)] hover:text-[var(--s2-blue)]"
          >
            접기
          </button>
        )}
        {info && (
          <span className="font-mono text-[11.5px] text-[var(--s2-faint)]">
            {info.order + 1} / {TOTAL_STEPS}
          </span>
        )}
      </span>
    </div>
  );
}
