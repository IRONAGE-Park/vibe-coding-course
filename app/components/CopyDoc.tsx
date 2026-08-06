"use client";

import { useState } from "react";

export default function CopyDoc({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 클립보드 권한이 없으면 조용히 무시 */
    }
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--s2-line)] bg-[var(--s2-tint)] px-4 py-2.5">
        <span className="font-mono text-[12px] font-bold text-[var(--s2-strong)]">
          {filename}
        </span>
        <button
          onClick={copy}
          className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
            copied
              ? "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-white"
              : "border-[var(--s2-line)] bg-[var(--s2-card)] text-[var(--s2-gray)] hover:border-[var(--s2-blue)] hover:text-[var(--s2-blue)]"
          }`}
        >
          {copied ? "복사됨 ✓" : "전체 복사"}
        </button>
      </div>
      <pre className="font-mono max-h-[420px] overflow-auto px-5 py-4 text-[12.5px] leading-[1.75] text-[var(--s2-strong)]">
        {content}
      </pre>
    </div>
  );
}
