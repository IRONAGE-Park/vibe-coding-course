import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ── 라벨/뱃지 ─────────────────────────────────────────── */

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--s2-line)] bg-[var(--s2-card)] px-4 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--s2-blue)]" />
      <span className="font-mono text-[12.5px] text-[var(--s2-gray)]">
        {children}
      </span>
    </span>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[var(--s2-blue-soft)] px-4 py-2 font-mono text-[12.5px] text-[var(--s2-blue)]">
      {children}
    </span>
  );
}

export function Blue({ children }: { children: ReactNode }) {
  return <span className="text-[var(--s2-blue)]">{children}</span>;
}

/* 외부 링크 */
export function Ext({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-bold text-[var(--s2-blue)] underline decoration-2 underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  );
}

/* ── 챕터 페이지 헤더 ──────────────────────────────────── */

export function PageHero({
  num,
  label,
  title,
  sub,
}: {
  num: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-[var(--s2-line)] bg-[var(--s2-tint)]">
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <Badge>{label}</Badge>
        <h1 className="mt-5 text-[32px] font-extrabold leading-[1.2] tracking-[-0.025em] md:text-[46px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.65] text-[var(--s2-body)] md:text-[17.5px]">
            {sub}
          </p>
        )}
      </div>
      <span
        aria-hidden
        className="font-mono pointer-events-none absolute -bottom-8 right-4 z-0 select-none text-[160px] leading-none tracking-[-0.05em] text-[var(--s2-ghost)] md:text-[220px]"
      >
        {num}
      </span>
    </div>
  );
}

/* ── 스텝 카드 ─────────────────────────────────────────── */

export function StepCard({
  no,
  total,
  title,
  tag,
  intro,
  children,
  id,
}: {
  no: number;
  total?: number;
  title: ReactNode;
  tag?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-6 shadow-[var(--s2-shadow-lg)] md:p-9"
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--s2-blue)] text-[17px] font-extrabold text-white">
            {no}
          </span>
          <h2 className="text-[20px] font-extrabold tracking-[-0.01em] md:text-[22px]">
            {title}
          </h2>
          {tag && (
            <span className="rounded-full border border-[var(--s2-ph-line)] bg-[var(--s2-warn-bg)] px-3 py-1 text-[12px] font-bold text-[var(--s2-warn-ink)]">
              {tag}
            </span>
          )}
        </div>
        {total && (
          <span className="mt-2 hidden shrink-0 font-mono text-[12px] text-[var(--s2-faint)] sm:block">
            {String(no).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        )}
      </div>
      {intro && (
        <p className="mb-6 text-[15px] leading-[1.6] text-[var(--s2-body)]">
          {intro}
        </p>
      )}
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

/* ── 번호 매긴 미니 스텝 ───────────────────────────────── */

export function MiniSteps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 border-b border-[var(--s2-divider)] py-3 last:border-b-0"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--s2-ink)] text-[12px] font-extrabold text-white">
            {i + 1}
          </span>
          <span className="text-[15px] leading-[1.6] text-[var(--s2-strong)]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ── 콜아웃 ───────────────────────────────────────────── */

export function Callout({
  title,
  children,
  tone = "info",
}: {
  title: ReactNode;
  children: ReactNode;
  tone?: "info" | "warn";
}) {
  const isWarn = tone === "warn";
  return (
    <div
      className={`rounded-[16px] border p-5 ${
        isWarn
          ? "border-[var(--s2-warn-line)] bg-[var(--s2-warn-bg)]"
          : "border-[var(--s2-info-line)] bg-[var(--s2-info-bg)]"
      }`}
    >
      <p className="mb-1.5 flex items-center gap-2 text-[14.5px] font-extrabold">
        <span
          className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-[11px] font-black text-white ${
            isWarn ? "bg-[var(--s2-warn-dot)]" : "bg-[var(--s2-blue)]"
          }`}
        >
          !
        </span>
        {title}
      </p>
      <div className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
        {children}
      </div>
    </div>
  );
}

/* ── 체크리스트 ────────────────────────────────────────── */

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--s2-blue-soft)] text-[11px] font-black text-[var(--s2-blue)]">
            ✓
          </span>
          <span className="text-[14.5px] leading-[1.6] text-[var(--s2-strong)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── 사이트 캡처 프레임 ────────────────────────────────── */

export type Highlight = {
  top: string;
  left: string;
  width: string;
  height: string;
  label?: string;
};

export function Shot({
  src,
  width,
  height,
  alt,
  url,
  href,
  highlight,
  eager,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  url?: string;
  href?: string;
  highlight?: Highlight;
  eager?: boolean;
}) {
  return (
    <figure className="flex flex-col gap-2.5">
      <div className="overflow-hidden rounded-[14px] border border-[var(--s2-line)] shadow-[var(--s2-shadow-md)]">
        <div className="flex items-center gap-2 border-b border-[var(--s2-line)] bg-[var(--s2-tint)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fcd34d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          {url &&
            (href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="ml-2 truncate rounded-full bg-[var(--s2-card)] px-3 py-1 font-mono text-[11px] text-[var(--s2-blue)] underline decoration-dotted underline-offset-2 hover:bg-[var(--s2-blue-soft)]"
              >
                {url} ↗
              </a>
            ) : (
              <span className="ml-2 truncate rounded-full bg-[var(--s2-card)] px-3 py-1 font-mono text-[11px] text-[var(--s2-gray)]">
                {url}
              </span>
            ))}
        </div>
        <div className="relative">
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            sizes="(max-width: 1024px) 100vw, 880px"
            className="w-full"
          />
          {highlight && (
            <div
              className="pointer-events-none absolute rounded-[8px] border-[3px] border-dashed border-[var(--s2-blue)]"
              style={{
                top: highlight.top,
                left: highlight.left,
                width: highlight.width,
                height: highlight.height,
              }}
            >
              {highlight.label && (
                <span className="absolute -top-8 left-0 whitespace-nowrap rounded-full bg-[var(--s2-blue)] px-3 py-1 text-[12px] font-bold text-white shadow-md">
                  {highlight.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

/* ── 터미널 목업 ──────────────────────────────────────── */

export function Term({
  title,
  lines,
}: {
  title?: string;
  lines: { prompt?: boolean; text: string; dim?: boolean }[];
}) {
  return (
    <div className="overflow-hidden rounded-[14px] shadow-[0_14px_44px_rgba(17,24,39,0.18)]">
      <div className="flex items-center gap-2 bg-[#3c4048] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fcd34d]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
        {title && (
          <span className="ml-2 font-mono text-[11px] text-[#b6bcc6]">
            {title}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 overflow-x-auto bg-[#24272e] px-5 py-4">
        {lines.map((l, i) => (
          <code
            key={i}
            className={`font-mono whitespace-pre-wrap text-[13px] leading-[1.7] ${
              l.dim ? "text-[#8b919c]" : "text-[#e7e9ee]"
            }`}
          >
            {l.prompt && <span className="text-[#7db2ff]">$ </span>}
            {l.text}
          </code>
        ))}
      </div>
    </div>
  );
}

/* ── 스크린샷 자리 표시 ────────────────────────────────── */

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-24 items-center justify-center rounded-[14px] border-2 border-dashed border-[var(--s2-ph-line)] bg-[var(--s2-ph-bg)] px-6 py-7 text-center">
      <p className="text-[13.5px] font-bold leading-[1.6] text-[var(--s2-warn-ink)]">
        {children}
      </p>
    </div>
  );
}

/* ── 이전/다음 페이저 ──────────────────────────────────── */

export function Pager({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <nav className="mx-auto flex max-w-5xl items-stretch gap-4 px-5 pb-16 pt-4 md:px-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col gap-1 rounded-[18px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 transition-colors hover:border-[var(--s2-blue)]"
        >
          <span className="font-mono text-[11.5px] text-[var(--s2-faint)]">
            &lt;- 이전
          </span>
          <span className="text-[15.5px] font-extrabold text-[var(--s2-strong)] group-hover:text-[var(--s2-blue)]">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end gap-1 rounded-[18px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 text-right transition-colors hover:border-[var(--s2-blue)]"
        >
          <span className="font-mono text-[11.5px] text-[var(--s2-faint)]">
            다음 -&gt;
          </span>
          <span className="text-[15.5px] font-extrabold text-[var(--s2-strong)] group-hover:text-[var(--s2-blue)]">
            {next.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}

/* ── 공통 푸터 ─────────────────────────────────────────── */

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--s2-line)] bg-[var(--s2-card)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 md:px-8">
        <span className="text-[13px] font-bold tracking-[0.1em] text-[var(--s2-footer)]">
          바이브코딩과 함께 살아남기
        </span>
        <span className="font-mono text-[11.5px] text-[var(--s2-footer)]">
          경상대학교 X (주)인바이즈
        </span>
      </div>
    </footer>
  );
}
