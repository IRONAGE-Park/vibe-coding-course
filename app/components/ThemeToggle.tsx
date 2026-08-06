"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** <html data-theme> 값이 바뀌면 다시 그리도록 구독합니다 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  // 서버 렌더에서는 알 수 없으므로 null — 아이콘 없이 자리만 잡습니다
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    readTheme,
    () => null
  );

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* 저장이 막혀 있어도 이번 방문에는 적용됩니다 */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드로" : "다크 모드로"}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--s2-line)] text-[14px] text-[var(--s2-gray)] transition-colors hover:border-[var(--s2-blue)] hover:text-[var(--s2-blue)]"
    >
      {theme === null ? "" : isDark ? "☀" : "☾"}
    </button>
  );
}
