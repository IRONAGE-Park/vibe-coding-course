"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/**
 * 용어 옆에 붙는 짧은 설명.
 * 본문은 짧게 두고, 모르는 사람만 펼쳐 보게 하려는 장치입니다.
 * 마우스는 올리면 뜨고, 터치·키보드는 눌러서 열고 닫습니다.
 */
export default function Tip({
  children,
  tip,
}: {
  children: ReactNode;
  tip: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const pointerType = useRef("");
  const id = useId();

  // 화면 가장자리에서 말풍선이 잘리지 않도록 좌우로 밀어 줍니다.
  useLayoutEffect(() => {
    const el = bubbleRef.current;
    if (!open || !el) return;
    const r = el.getBoundingClientRect();
    const pad = 12;
    let shift = 0;
    if (r.left < pad) shift = pad - r.left;
    else if (r.right > window.innerWidth - pad)
      shift = window.innerWidth - pad - r.right;
    el.style.transform = `translateX(calc(-50% + ${shift}px))`;
  }, [open]);

  // 바깥을 누르거나 Esc를 누르면 닫습니다.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onClick(e: MouseEvent) {
    // 마우스는 올리는 순간 이미 열려 있으니, 눌러도 닫지 않습니다.
    if (e.detail > 0 && pointerType.current === "mouse") setOpen(true);
    else setOpen((v) => !v);
  }

  return (
    <span
      ref={wrapRef}
      className="relative inline-block"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onClick={onClick}
        className="cursor-help rounded-[3px] underline decoration-[var(--s2-blue)] decoration-dotted decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--s2-blue)]"
      >
        {children}
      </button>
      {open && (
        <span
          ref={bubbleRef}
          id={id}
          role="tooltip"
          style={{ transform: "translateX(-50%)" }}
          className="absolute bottom-full left-1/2 z-40 mb-2 block w-max max-w-[min(18rem,calc(100vw_-_24px))] rounded-[10px] bg-[var(--s2-ink)] px-3 py-2 text-left text-[12.5px] font-normal leading-[1.55] text-[var(--s2-on-ink)] shadow-[var(--s2-shadow-md)]"
        >
          {tip}
        </span>
      )}
    </span>
  );
}
