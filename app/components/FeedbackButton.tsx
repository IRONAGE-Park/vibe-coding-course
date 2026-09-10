"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { getName, getVisitorId } from "@/app/lib/tracking";
import {
  subscribeViewing,
  viewingServerSnapshot,
  viewingSnapshot,
} from "@/app/lib/viewing";
import { pageLabel, stepInfo } from "@/app/lib/steps";
import { FEEDBACK_KINDS, FEEDBACK_MAX } from "@/app/lib/feedback";
import type { FeedbackKind, FeedbackRow } from "@/app/lib/stats-types";
import type { RailItem } from "./StepRail";
import { useTracking } from "./Participation";

/**
 * 화면 오른쪽 아래 문의 버튼.
 * 강의 중에 들어온 참가자에게만 보이고, 누르면 강사에게 짧은 글을 보내는 창이 열립니다.
 * 보낼 때 지금 보고 있는 장 · 단계가 함께 전달되어, 강사가 되묻지 않고 바로 찾아갈 수 있습니다.
 */
export default function FeedbackButton() {
  const pathname = usePathname();
  const tracking = useTracking();
  const [open, setOpen] = useState(false);

  if (!tracking || pathname.startsWith("/admin")) return null;

  return (
    <>
      {open && <Panel pathname={pathname} onClose={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "문의 창 닫기" : "강사에게 문의하기"}
        className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-full bg-[var(--s2-blue)] py-3 pl-4 pr-5 text-[14px] font-bold text-[var(--s2-on-blue)] shadow-[var(--s2-shadow-lg)] transition-transform hover:-translate-y-0.5 md:right-6"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {open ? "닫기" : "문의"}
      </button>
    </>
  );
}

/** 보고 있는 곳을 한 줄로 — "01 환경 설정 · 3. GitHub 가입" */
function contextLabel(path: string, section: RailItem | null): string {
  const page = pageLabel(path);
  if (!section) return page;
  const info = stepInfo(section.id);
  return info
    ? `${page} · ${info.indexInChapter}. ${info.title}`
    : `${page} · ${section.num} ${section.label}`;
}

function Panel({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const viewing = useSyncExternalStore(
    subscribeViewing,
    viewingSnapshot,
    viewingServerSnapshot
  );
  const context = contextLabel(pathname, viewing);

  const [kind, setKind] = useState<FeedbackKind>("question");
  const [text, setText] = useState("");
  const [items, setItems] = useState<FeedbackRow[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // 열 때마다 내가 보낸 문의와 강사가 확인했는지를 받아옵니다.
  useEffect(() => {
    let alive = true;
    fetch(`/api/feedback?visitor=${encodeURIComponent(getVisitorId())}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (alive) setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (alive) setItems([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  // 새 글이 생기면 대화 맨 아래가 보이게 합니다.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const body = text.trim();
    if (!body || busy) return;

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: getVisitorId(),
          name: getName(),
          kind,
          body,
          path: pathname,
          sectionId: viewing?.id ?? null,
          context,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "보내지 못했습니다. 다시 시도해주세요.");
        return;
      }
      setItems((prev) => [...(prev ?? []), data.item as FeedbackRow]);
      setText("");
    } catch {
      setError("네트워크 오류입니다. 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  // 채팅처럼 Enter 로 보내고 Shift+Enter 로 줄을 바꿉니다.
  // 한글 입력 중(조합 중) 의 Enter 는 글자를 확정하는 것이라 보내지 않습니다.
  function onKeyDown(e: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div
      role="dialog"
      aria-label="강사에게 문의"
      className="fixed bottom-20 right-4 z-[60] flex max-h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[22px] border border-[var(--s2-line)] bg-[var(--s2-card)] shadow-[var(--s2-shadow-lg)] md:right-6"
    >
      <header className="border-b border-[var(--s2-line)] px-5 py-3.5">
        <p className="text-[15px] font-extrabold">강사에게 문의</p>
        <p className="mt-0.5 text-[12px] text-[var(--s2-faint)]">
          막힌 곳이나 고쳤으면 하는 점을 알려주세요
        </p>
      </header>

      <div
        ref={listRef}
        className="flex min-h-[5rem] flex-1 flex-col gap-3 overflow-y-auto px-5 py-4"
      >
        {items === null ? (
          <p className="text-[12.5px] text-[var(--s2-faint)]">불러오는 중…</p>
        ) : items.length === 0 ? (
          <p className="text-[12.5px] leading-[1.6] text-[var(--s2-faint)]">
            아직 보낸 문의가 없습니다. 지금 보고 있는 단계가 함께 전달되니
            어디서 막혔는지는 따로 적지 않아도 됩니다.
          </p>
        ) : (
          items.map((item) => <Bubble key={item.id} item={item} />)
        )}
      </div>

      <form
        onSubmit={send}
        className="border-t border-[var(--s2-line)] px-4 pb-4 pt-3"
      >
        <p className="flex min-w-0 items-center gap-1.5 text-[11.5px]">
          <span className="shrink-0 text-[var(--s2-faint)]">지금 보는 곳</span>
          <span className="min-w-0 truncate font-bold text-[var(--s2-blue)]">
            {context}
          </span>
        </p>

        <div className="mt-2 flex gap-1.5">
          {(Object.keys(FEEDBACK_KINDS) as FeedbackKind[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={`rounded-full px-3 py-1 text-[12px] font-bold transition-colors ${
                kind === k
                  ? "bg-[var(--s2-ink)] text-[var(--s2-on-ink)]"
                  : "border border-[var(--s2-line)] text-[var(--s2-gray)]"
              }`}
            >
              {FEEDBACK_KINDS[k]}
            </button>
          ))}
        </div>

        <textarea
          autoFocus
          rows={3}
          maxLength={FEEDBACK_MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            kind === "question"
              ? "예) gh auth login 을 하면 브라우저가 안 열려요"
              : "예) 캡처 화면이 작아서 글자가 잘 안 보여요"
          }
          className="mt-2 w-full resize-none rounded-[14px] border border-[var(--s2-line)] bg-[var(--s2-tint)] px-3.5 py-2.5 text-[16px] leading-[1.5] outline-none focus:border-[var(--s2-blue)] md:text-[14px]"
        />

        {error && (
          <p className="mt-1.5 text-[12.5px] font-semibold text-[var(--s2-bad-ink)]">
            {error}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] text-[var(--s2-faint)]">
            Enter 보내기 · Shift+Enter 줄바꿈
          </span>
          <button
            type="submit"
            disabled={busy || !text.trim()}
            className="shrink-0 rounded-full bg-[var(--s2-blue)] px-4 py-2 text-[13.5px] font-bold text-[var(--s2-on-blue)] disabled:opacity-40"
          >
            {busy ? "보내는 중" : "보내기"}
          </button>
        </div>
      </form>
    </div>
  );
}

/** 내가 보낸 글 한 개 — 종류 · 위치 · 시각 · 강사 확인 여부를 아래에 붙입니다 */
function Bubble({ item }: { item: FeedbackRow }) {
  const time = new Date(item.createdAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex flex-col items-end gap-1">
      <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-[16px] rounded-br-[6px] bg-[var(--s2-blue)] px-3.5 py-2 text-[13.5px] leading-[1.55] text-[var(--s2-on-blue)]">
        {item.body}
      </p>
      <p className="max-w-[90%] truncate text-right text-[10.5px] text-[var(--s2-faint)]">
        {FEEDBACK_KINDS[item.kind]} · {item.context} · {time} ·{" "}
        {item.resolvedAt ? (
          <span className="font-bold text-[var(--s2-good-ink)]">강사 확인</span>
        ) : (
          "전송됨"
        )}
      </p>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 4.5h12a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3H4A1.5 1.5 0 0 1 2.5 13V6A1.5 1.5 0 0 1 4 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
