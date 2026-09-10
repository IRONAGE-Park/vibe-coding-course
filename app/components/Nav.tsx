"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const ITEMS = [
  { href: "/setup", num: "01", label: "환경 설정" },
  { href: "/plan", num: "02", label: "문제 정의" },
  { href: "/build", num: "03", label: "구축·배포" },
  { href: "/update", num: "04", label: "업데이트" },
  { href: "/learn", num: "05", label: "배우는 법" },
  { href: "/tools", num: "06", label: "유용한 도구" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--s2-line)] bg-[var(--s2-card)]/90 backdrop-blur">
      <div className="mx-auto w-full flex h-16 max-w-5xl items-center justify-between gap-3 px-5 md:px-8">
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="text-[15px] font-extrabold tracking-tight">
            VIBE<span className="text-[var(--s2-blue)]">CODING</span>
          </span>
          <span className="font-mono hidden text-[11px] text-[var(--s2-faint)] sm:inline">
            실습 가이드
          </span>
        </Link>
        {/* 장이 늘어 좁은 화면에서는 한 줄을 유지한 채 가로로 넘깁니다 — 페이지 폭이 넘치지 않게 */}
        <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none] md:gap-1">
          {ITEMS.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-colors md:px-3.5 md:text-[13.5px] ${
                pathname === i.href
                  ? "bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                  : "text-[var(--s2-gray)] hover:bg-[var(--s2-tint)] hover:text-[var(--s2-ink)]"
              }`}
            >
              <span className="font-mono mr-1 hidden text-[11px] lg:inline">
                {i.num}
              </span>
              {i.label}
            </Link>
          ))}
          <Link
            href="/help"
            className={`ml-1 shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[13px] font-semibold transition-colors md:px-3.5 md:text-[13.5px] ${
              pathname === "/help"
                ? "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                : "border-[var(--s2-line)] text-[var(--s2-gray)] hover:border-[var(--s2-blue)] hover:text-[var(--s2-blue)]"
            }`}
          >
            막혔을 때
          </Link>
          <span className="ml-1.5 shrink-0">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
