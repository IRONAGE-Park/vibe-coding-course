"use client";

import { useEffect, useState } from "react";

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
      <ul className="flex flex-col gap-1 rounded-[18px] border border-[var(--s2-line)] bg-[var(--s2-card)]/90 p-2 shadow-[var(--s2-shadow-md)] backdrop-blur">
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
    </nav>
  );
}
