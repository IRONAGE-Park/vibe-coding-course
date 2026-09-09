"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  subscribe,
  doneSnapshot,
  doneServerSnapshot,
  parseDone,
  nameSnapshot,
  nameServerSnapshot,
} from "@/app/lib/tracking";
import { currentStepId, stepInfo, TOTAL_STEPS } from "@/app/lib/steps";
import { useParticipation, useTracking } from "./Participation";

export type RailItem = { id: string; num: string; label: string };

export default function StepRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="단계 진행 상황"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex max-w-[15rem] flex-col rounded-[18px] border border-[var(--s2-line)] bg-[var(--s2-card)]/90 p-2 shadow-[var(--s2-shadow-md)] backdrop-blur">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3 transition-colors ${
                    isActive
                      ? "bg-[var(--s2-blue)]"
                      : "hover:bg-[var(--s2-tint)]"
                  }`}
                >
                  <span
                    className={`font-mono w-6 text-center text-[10.5px] ${
                      isActive
                        ? "font-bold text-[var(--s2-on-blue)]"
                        : "text-[var(--s2-faint)] group-hover:text-[var(--s2-blue)]"
                    }`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`whitespace-nowrap text-[12px] font-bold ${
                      isActive
                        ? "text-[var(--s2-on-blue)]"
                        : "text-[var(--s2-gray)] group-hover:text-[var(--s2-ink)]"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <MyStatus />
      </div>
    </nav>
  );
}

/** 지금 누구로, 어느 강의에서, 어디까지 왔는지 — 강의 중일 때만 보입니다 */
function MyStatus() {
  const tracking = useTracking();
  const { sessionName } = useParticipation();
  const raw = useSyncExternalStore(subscribe, doneSnapshot, doneServerSnapshot);
  const myName = useSyncExternalStore(
    subscribe,
    nameSnapshot,
    nameServerSnapshot
  );

  const done = useMemo(() => parseDone(raw), [raw]);
  const current = currentStepId(done);
  const info = current ? stepInfo(current) : null;

  if (!tracking) return null;

  return (
    <div className="mt-2 border-t border-[var(--s2-line)] px-3 pb-1 pt-2.5">
      <p className="truncate text-[12px] font-extrabold text-[var(--s2-ink)]">
        {myName || "이름 없음"}
      </p>
      {sessionName && (
        <p className="mt-0.5 truncate text-[11px] text-[var(--s2-faint)]">
          {sessionName}
        </p>
      )}

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] text-[var(--s2-faint)]">
          {done.size} / {TOTAL_STEPS}
        </span>
        <span className="font-mono text-[11px] font-bold text-[var(--s2-blue)]">
          {Math.round((done.size / TOTAL_STEPS) * 100)}%
        </span>
      </div>
      <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-[var(--s2-tint)]">
        <span
          className="block h-full rounded-full bg-[var(--s2-blue)] transition-all"
          style={{ width: `${(done.size / TOTAL_STEPS) * 100}%` }}
        />
      </span>

      <p className="mt-2 truncate text-[11.5px] text-[var(--s2-body)]">
        {info ? (
          <>
            <span className="text-[var(--s2-faint)]">지금 </span>
            {info.chapterNum} · {info.indexInChapter}. {info.title}
          </>
        ) : (
          <span className="font-bold text-[var(--s2-good-ink)]">전체 완료</span>
        )}
      </p>
    </div>
  );
}
