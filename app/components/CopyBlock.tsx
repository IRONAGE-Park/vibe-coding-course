"use client";

import { useState } from "react";

export default function CopyBlock({
  label,
  command,
}: {
  label?: string;
  command: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 클립보드 권한이 없으면 조용히 무시 */
    }
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--s2-line)] bg-[var(--s2-tint)]">
      {label && (
        <div className="flex items-center justify-between border-b border-[var(--s2-line)] px-4 py-2">
          <span className="font-mono text-[11.5px] text-[var(--s2-gray)]">
            {label}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <code className="font-mono overflow-x-auto whitespace-pre text-[13.5px] leading-relaxed text-[var(--s2-strong)]">
          {command}
        </code>
        <button
          onClick={copy}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-bold transition-colors ${
            copied
              ? "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
              : "border-[var(--s2-line)] bg-[var(--s2-card)] text-[var(--s2-gray)] hover:border-[var(--s2-blue)] hover:text-[var(--s2-blue)]"
          }`}
        >
          {copied ? "복사됨 ✓" : "복사"}
        </button>
      </div>
    </div>
  );
}
