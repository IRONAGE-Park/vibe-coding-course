"use client";

import { useSyncExternalStore } from "react";
import { THEME_COOKIE, THEME_MAX_AGE, type Theme } from "@/app/lib/theme";

/** <html data-theme> 값이 바뀌면 다시 그리도록 구독합니다 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // 아직 직접 고르지 않았다면 시스템 설정을 따라가므로, 그 변화도 봅니다.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/**
 * 지금 화면에 적용된 테마.
 * data-theme 이 없으면 아직 직접 고르지 않은 것이라 시스템 설정을 따릅니다.
 * CSS 의 prefers-color-scheme 블록과 같은 기준이어야 아이콘이 화면과 어긋나지 않습니다.
 */
function readTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "dark" || set === "light") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
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

    // 이번 화면에는 즉시 반영하고,
    document.documentElement.dataset.theme = next;

    // 다음 방문에는 서버가 첫 페인트부터 심어주도록 쿠키에 남깁니다.
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${THEME_MAX_AGE}; samesite=lax`;
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
