"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  CHAPTERS,
  TOTAL_STEPS,
  pageLabel,
  pageOrder,
  stepLabel,
} from "@/app/lib/steps";
import { FEEDBACK_KINDS } from "@/app/lib/feedback";
import type { ChapterNotes } from "@/app/lib/lecture-notes";
import type { Stats, VisitorRow } from "@/app/lib/stats-types";

const REFRESH_MS = 10_000;

export default function AdminClient({
  initialAuthed,
  configured,
  initialStats,
  notes,
}: {
  initialAuthed: boolean;
  configured: boolean;
  initialStats: Stats | null;
  /** 강사 노트 — 로그인한 경우에만 서버가 내려줍니다 */
  notes: ChapterNotes[] | null;
}) {
  const router = useRouter();

  if (initialAuthed && initialStats) {
    return <Dashboard initialStats={initialStats} notes={notes ?? []} />;
  }
  return <Login configured={configured} onSuccess={() => router.refresh()} />;
}

/* ── 비밀번호 입장 ──────────────────────────────────────── */

function Login({
  configured,
  onSuccess,
}: {
  configured: boolean;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onSuccess();
        return;
      }
      setError(data.error ?? "입장하지 못했습니다.");
    } catch {
      setError("네트워크 오류입니다. 다시 시도해주세요.");
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto w-full flex min-h-dvh max-w-sm flex-col justify-center px-5 py-12">
      <p className="font-mono text-[11.5px] tracking-[0.12em] text-[var(--s2-blue)]">
        ADMIN
      </p>
      <h1 className="mt-2 text-[26px] font-black tracking-[-0.02em]">
        진행 현황 보기
      </h1>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
        강사용 화면입니다. 비밀번호를 입력해주세요.
      </p>

      {!configured && (
        <p className="mt-5 rounded-[14px] border border-[var(--s2-warn-line)] bg-[var(--s2-warn-bg)] p-4 text-[13px] leading-[1.6] text-[var(--s2-warn-ink)]">
          서버에 ADMIN_PASSWORD 환경변수가 아직 없습니다. Vercel 프로젝트 설정에
          추가한 뒤 다시 배포해주세요.
        </p>
      )}

      <form onSubmit={submit} className="mt-6">
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full rounded-[14px] border border-[var(--s2-line)] bg-[var(--s2-card)] px-4 py-3.5 text-[16px] outline-none focus:border-[var(--s2-blue)]"
        />
        {error && (
          <p className="mt-2.5 text-[13px] font-semibold text-[var(--s2-bad-ink)]">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-3 w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3.5 text-[15px] font-bold text-[var(--s2-on-blue)] disabled:opacity-40"
        >
          {busy ? "확인 중" : "입장"}
        </button>
      </form>
    </div>
  );
}

/* ── 대시보드 ───────────────────────────────────────────── */

/* ── 강사 노트 ─────────────────────────────────────────────
   참가자 화면에서 뺀 배경 설명 · 사례 · 진행 요령을 장별로 봅니다. */

function NotesView({ notes }: { notes: ChapterNotes[] }) {
  const [chapter, setChapter] = useState(CHAPTERS[0].key);
  const current = notes.find((n) => n.key === chapter);

  return (
    <section className="mt-7">
      {/* 강의 중에는 지금 장만 빠르게 골라 봅니다 */}
      <div className="flex flex-wrap gap-1.5">
        {CHAPTERS.map((c) => (
          <button
            key={c.key}
            onClick={() => setChapter(c.key)}
            className={`rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors ${
              chapter === c.key
                ? "bg-[var(--s2-ink)] text-[var(--s2-on-ink)]"
                : "border border-[var(--s2-line)] text-[var(--s2-gray)]"
            }`}
          >
            {c.num} {c.label}
          </button>
        ))}
      </div>

      {!current || current.sections.length === 0 ? (
        <div className="mt-4">
          <Empty>이 장에는 노트가 없습니다.</Empty>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {current.sections.map((s) => (
            <details
              key={s.title}
              open
              className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
            >
              <summary className="cursor-pointer text-[14.5px] font-extrabold">
                {s.title}
              </summary>
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-[13.5px] leading-[1.6] text-[var(--s2-body)]"
                  >
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--s2-blue)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}

      <p className="mt-4 text-[11.5px] leading-[1.5] text-[var(--s2-faint)]">
        참가자 화면에서 뺀 배경 설명 · 사례 · 진행 요령입니다. 근거 자료는
        docs/research 에 있습니다.
      </p>
    </section>
  );
}

type Tab = "people" | "inbox" | "steps" | "time" | "notes" | "sessions";

function Dashboard({
  initialStats,
  notes,
}: {
  initialStats: Stats;
  notes: ChapterNotes[];
}) {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>(initialStats);
  const [viewing, setViewing] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("people");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(
    async (sessionId?: string | null) => {
      const target = sessionId === undefined ? viewing : sessionId;
      try {
        const qs = target ? `?session=${encodeURIComponent(target)}` : "";
        const res = await fetch(`/api/admin/stats${qs}`, { cache: "no-store" });
        if (res.status === 401) {
          router.refresh();
          return;
        }
        setStats(await res.json());
        setError("");
      } catch {
        setError("갱신하지 못했습니다. 화면의 숫자는 마지막으로 받은 값입니다.");
      }
    },
    [router, viewing]
  );

  useEffect(() => {
    // 탭이 뒤에 있을 때는 갱신을 멈춥니다.
    // 켜두기만 한 화면이 조회 요청을 계속 쓰지 않게 하려는 것입니다.
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      timer ??= setInterval(() => void refresh(), REFRESH_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        void refresh();
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  async function call(url: string, init?: RequestInit) {
    setBusy(true);
    try {
      const res = await fetch(url, init);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "처리하지 못했습니다.");
        return null;
      }
      setError("");
      return data;
    } catch {
      setError("네트워크 오류입니다.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function startSession() {
    const name = window.prompt("강의 이름을 적어주세요.", `강의 ${todayKST()}`);
    if (name === null) return;

    const password = window.prompt(
      "참가자가 입장할 때 쓸 비밀번호를 정해주세요. 4자 이상이며, 강의 중에 참가자에게 알려주시면 됩니다."
    );
    if (password === null) return;

    if (
      await call("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      })
    ) {
      setViewing(null);
      setTab("people");
      await refresh(null);
    }
  }

  async function stopSession() {
    if (
      !window.confirm(
        "강의를 종료할까요? 기록은 그대로 남고, 참가자 화면은 비밀번호 없이 읽을 수 있는 안내서로 돌아갑니다."
      )
    )
      return;
    if (
      await call("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stop: true }),
      })
    ) {
      setViewing(null);
      await refresh(null);
    }
  }

  async function resume(id: string) {
    const password = window.prompt(
      "이 강의를 다시 시작합니다. 비밀번호를 새로 정하려면 입력하고, 예전 것을 그대로 쓰려면 비워두세요."
    );
    if (password === null) return;
    if (
      await call("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activate: id, password }),
      })
    ) {
      setViewing(null);
      await refresh(null);
    }
  }

  async function removeSession(id: string, name: string) {
    if (
      !window.confirm(
        `"${name}" 회차와 그 안의 모든 기록을 지웁니다.\n되돌릴 수 없습니다. 계속할까요?`
      )
    )
      return;
    if (
      await call(`/api/admin/sessions?session=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
    ) {
      setViewing(null);
      await refresh(null);
    }
  }

  async function removeVisitor(v: VisitorRow) {
    const who = v.name ?? short(v.id);
    if (!window.confirm(`${who} 의 기록을 지울까요?`)) return;
    const sid = stats.session?.id;
    if (!sid) return;
    if (
      await call(
        `/api/admin/sessions?session=${encodeURIComponent(sid)}&visitor=${encodeURIComponent(v.id)}`,
        { method: "DELETE" }
      )
    ) {
      await refresh();
    }
  }

  async function resolveFeedback(id: number, resolved: boolean) {
    if (
      await call("/api/admin/feedback", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, resolved }),
      })
    ) {
      await refresh();
    }
  }

  const viewed = stats.sessions.find((s) => s.id === stats.session?.id);
  const isViewingRunning = viewed?.isRunning ?? false;

  const unresolved = stats.feedback.filter((f) => !f.resolvedAt).length;
  const names = new Map(stats.visitors.map((v) => [v.id, v.name]));

  const pages = [...stats.pageTimes].sort(
    (a, b) => pageOrder(a.path) - pageOrder(b.path)
  );
  const clicks = [...stats.nextClicks].sort(
    (a, b) => pageOrder(a.path) - pageOrder(b.path) || b.visitors - a.visitors
  );

  const avgPct = stats.totalSteps
    ? Math.round((stats.averageDone / stats.totalSteps) * 100)
    : 0;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-7 md:px-6">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--s2-blue)]">
            ADMIN
          </p>
          <h1 className="mt-1 truncate text-[23px] font-black tracking-[-0.02em]">
            {stats.session?.name ?? "진행 현황"}
          </h1>
          <p className="mt-1 text-[12px] text-[var(--s2-faint)]">
            {isViewingRunning ? "진행 중" : "종료된 강의"}
            {stats.session ? ` · ${when(stats.session.createdAt)} 시작` : ""}
          </p>
        </div>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.refresh();
          }}
          className="shrink-0 rounded-full border border-[var(--s2-line)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--s2-gray)]"
        >
          나가기
        </button>
      </header>

      {error && (
        <p className="mt-4 rounded-[12px] bg-[var(--s2-bad-bg)] px-3 py-2 text-[13px] text-[var(--s2-bad-ink)]">
          {error}
        </p>
      )}

      {!stats.connected && (
        <p className="mt-5 rounded-[14px] border border-[var(--s2-warn-line)] bg-[var(--s2-warn-bg)] p-4 text-[13px] leading-[1.6] text-[var(--s2-warn-ink)]">
          저장소가 연결되지 않았습니다. Supabase를 연동하고 표를 만들면 숫자가
          채워집니다.
        </p>
      )}

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <Stat label="참가자" value={String(stats.totalVisitors)} />
        <Stat label="오늘 접속" value={String(stats.todayVisitors)} />
        <Stat label="평균 진행" value={`${avgPct}%`} />
      </div>

      {/* ── 탭 ────────────────────────────────────────── */}
      {/* 탭이 여섯 개라 좁은 화면에서는 두 줄로 나눕니다 */}
      <div className="mt-6 grid grid-cols-3 gap-1.5 sm:flex">
        {(
          [
            ["people", `참가자 ${stats.totalVisitors}`],
            ["inbox", unresolved > 0 ? `문의 ${unresolved}` : "문의"],
            ["steps", "단계별"],
            ["time", "시간"],
            ["notes", "강사 노트"],
            ["sessions", "강의"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-2 text-[13px] font-bold transition-colors ${
              tab === key
                ? "bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                : "border border-[var(--s2-line)] text-[var(--s2-gray)]"
            }`}
          >
            <span className="truncate">{label}</span>
            {key === "sessions" && stats.running && (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--s2-good-ink)]"
              />
            )}
          </button>
        ))}
      </div>

      {tab === "people" && (
        <Section
          title="참가자별 진행"
          note="진행이 느린 사람이 위에 옵니다"
        >
          {stats.visitors.length === 0 ? (
            <Empty>아직 이 회차에 접속한 사람이 없습니다.</Empty>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.visitors.map((v) => (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
                >
                  {/* 이름과 숫자, 제거는 한 줄. 이름만 줄여서 맞춥니다 */}
                  <div className="flex items-center gap-2.5">
                    <p className="min-w-0 flex-1 truncate text-[15px] font-extrabold">
                      {v.name ?? "이름 안 밝힘"}
                    </p>
                    <span className="font-mono shrink-0 text-[12.5px] font-bold text-[var(--s2-blue)]">
                      {v.done} / {stats.totalSteps}
                    </span>
                    <button
                      onClick={() => removeVisitor(v)}
                      disabled={busy || !isViewingRunning}
                      title={
                        isViewingRunning
                          ? ""
                          : "진행 중인 강의에서만 지울 수 있습니다"
                      }
                      className="shrink-0 rounded-full border border-[var(--s2-bad-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-bad-ink)] disabled:opacity-30"
                    >
                      제거
                    </button>
                  </div>

                  {/* 단계 이름은 길어서 줄바꿈을 허용합니다.
                      한 줄로 잘라내면 좁은 화면에서 읽을 게 남지 않습니다 */}
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--s2-body)]">
                    {v.currentStep ? (
                      <>
                        <span className="text-[var(--s2-faint)]">지금 </span>
                        {stepLabel(v.currentStep)}
                      </>
                    ) : (
                      <span className="font-bold text-[var(--s2-good-ink)]">
                        전체 완료
                      </span>
                    )}
                  </p>
                  <p className="font-mono mt-1 truncate text-[11px] text-[var(--s2-faint)]">
                    {short(v.id)} · {when(v.firstSeen)} 접속
                  </p>
                  <Bar value={v.done} max={stats.totalSteps} />
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {tab === "inbox" && (
        <Section title="문의 · 개선 제안" note="새것이 위에 옵니다">
          {stats.feedback.length === 0 ? (
            <Empty>아직 받은 문의가 없습니다.</Empty>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.feedback.map((f) => {
                const resolved = f.resolvedAt !== null;
                return (
                  <div
                    key={f.id}
                    className={`overflow-hidden rounded-[16px] border p-4 ${
                      resolved
                        ? "border-[var(--s2-divider)] bg-[var(--s2-tint)] opacity-70"
                        : "border-[var(--s2-line)] bg-[var(--s2-card)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          f.kind === "question"
                            ? "bg-[var(--s2-info-bg)] text-[var(--s2-blue)]"
                            : "bg-[var(--s2-warn-bg)] text-[var(--s2-warn-ink)]"
                        }`}
                      >
                        {FEEDBACK_KINDS[f.kind]}
                      </span>
                      <p className="min-w-0 flex-1 truncate text-[14.5px] font-extrabold">
                        {names.get(f.visitorId) ?? "이름 안 밝힘"}
                      </p>
                      <span className="font-mono shrink-0 text-[11px] text-[var(--s2-faint)]">
                        {when(f.createdAt)}
                      </span>
                    </div>

                    {/* 보낼 때 보고 있던 곳. 강사가 바로 그 단계로 찾아갈 수 있게 합니다 */}
                    <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--s2-faint)]">
                      {f.context}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[1.6] text-[var(--s2-strong)]">
                      {f.body}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => resolveFeedback(f.id, !resolved)}
                        disabled={busy}
                        className={`rounded-full px-3 py-1 text-[12px] font-semibold disabled:opacity-40 ${
                          resolved
                            ? "border border-[var(--s2-line)] text-[var(--s2-gray)]"
                            : "bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                        }`}
                      >
                        {resolved ? "확인 취소" : "확인했어요"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      )}

      {tab === "steps" &&
        CHAPTERS.filter((c) => c.steps.length > 0).map((c, ci) => (
          <Section
            key={c.key}
            title={`${c.num} ${c.label}`}
            note={ci === 0 ? "걸린 시간 · 완료 인원" : undefined}
          >
            <div className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)]">
              {c.steps.map((s, i) => {
                const n = stats.stepCounts[s.id] ?? 0;
                const t = stats.stepTimes[s.id];
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i > 0 ? "border-t border-[var(--s2-line)]" : ""
                    }`}
                  >
                    <span className="flex-1 text-[13.5px] leading-[1.45]">
                      {s.title}
                    </span>
                    <span
                      title="앞 단계를 끝낸 때부터 이 단계를 끝낸 때까지 (중앙값)"
                      className="font-mono w-14 shrink-0 text-right text-[11.5px] text-[var(--s2-faint)]"
                    >
                      {t ? duration(t.medianS * 1000) : "–"}
                    </span>
                    <span className="w-16 shrink-0">
                      <Bar
                        value={n}
                        max={Math.max(stats.totalVisitors, 1)}
                        thin
                      />
                    </span>
                    <span className="font-mono w-8 shrink-0 text-right text-[13px] font-bold text-[var(--s2-blue)]">
                      {n}
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>
        ))}

      {tab === "time" && (
        <>
          <Section title="페이지별 머문 시간" note="탭을 보고 있던 시간 · 중앙값">
            {pages.length === 0 ? (
              <Empty>아직 기록이 없습니다.</Empty>
            ) : (
              <div className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)]">
                {pages.map((p, i) => (
                  <div
                    key={p.path}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i > 0 ? "border-t border-[var(--s2-line)]" : ""
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate text-[13.5px]">
                      {pageLabel(p.path)}
                    </span>
                    <span className="font-mono shrink-0 text-[11.5px] text-[var(--s2-faint)]">
                      {p.visitors}명 · 평균 {duration(p.avgMs)}
                    </span>
                    <span className="font-mono w-16 shrink-0 text-right text-[13px] font-bold text-[var(--s2-blue)]">
                      {duration(p.medianMs)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="다음 장으로 넘어간 시점" note="처음 누른 때 기준">
            {clicks.length === 0 ? (
              <Empty>아직 페이지 아래 &lsquo;다음&rsquo;을 누른 사람이 없습니다.</Empty>
            ) : (
              <div className="flex flex-col gap-2">
                {clicks.map((c) => (
                  <div
                    key={`${c.path}>${c.target}`}
                    className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <p className="min-w-0 flex-1 truncate text-[14.5px] font-extrabold">
                        {pageLabel(c.path)} → {pageLabel(c.target)}
                      </p>
                      <span className="font-mono shrink-0 text-[12.5px] font-bold text-[var(--s2-blue)]">
                        {c.visitors} / {stats.totalVisitors}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--s2-body)]">
                      <span className="text-[var(--s2-faint)]">페이지에 머문 시간 </span>
                      {duration(c.medianMs)}
                      <span className="text-[var(--s2-faint)]"> (중앙값)</span>
                    </p>
                    <p className="font-mono mt-1 truncate text-[11px] text-[var(--s2-faint)]">
                      첫 클릭 {when(c.firstAt)} · 중앙값 {when(c.medianAt)}
                    </p>
                    <Bar value={c.visitors} max={Math.max(stats.totalVisitors, 1)} />
                  </div>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      {tab === "notes" && <NotesView notes={notes} />}

      {tab === "sessions" && (
        <Section title="강의">
          {stats.running ? (
            <>
              <button
                onClick={stopSession}
                disabled={busy}
                className="w-full rounded-[14px] border border-[var(--s2-bad-line)] bg-[var(--s2-bad-bg)] px-5 py-3 text-[14.5px] font-bold text-[var(--s2-bad-ink)] disabled:opacity-40"
              >
                강의 종료하기
              </button>
              <p className="mt-2 text-[12.5px] text-[var(--s2-body)]">
                기록은 남고, 참가자 화면은 안내서로 돌아갑니다.
              </p>
            </>
          ) : (
            <>
              <button
                onClick={startSession}
                disabled={busy}
                className="w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3 text-[14.5px] font-bold text-[var(--s2-on-blue)] disabled:opacity-40"
              >
                강의 시작하기
              </button>
              <p className="mt-2 text-[12.5px] text-[var(--s2-body)]">
                이름과 참가자용 비밀번호를 정합니다.
              </p>
            </>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {stats.sessions.length === 0 ? (
              <Empty>아직 연 강의가 없습니다.</Empty>
            ) : (
              stats.sessions.map((s) => {
                const selected = s.id === stats.session?.id;
                return (
                  <div
                    key={s.id}
                    className={`rounded-[14px] border p-3.5 ${
                      selected
                        ? "border-[var(--s2-blue)] bg-[var(--s2-info-bg)]"
                        : "border-[var(--s2-line)] bg-[var(--s2-card)]"
                    }`}
                  >
                    {/* 좁은 화면에서는 이름과 조작 버튼을 줄로 나눕니다.
                        한 줄에 몰면 이름이 줄어들지 못해 화면을 넘칩니다 */}
                    <button
                      onClick={() => {
                        setViewing(s.id);
                        void refresh(s.id);
                      }}
                      className="block w-full text-left"
                    >
                      <span className="block truncate text-[14.5px] font-extrabold">
                        {s.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-[var(--s2-faint)]">
                        {when(s.startedAt ?? s.createdAt)} · 참가자 {s.visitors}
                      </span>
                    </button>

                    <div className="mt-2.5 flex items-center gap-2">
                      {s.isRunning ? (
                        <span className="rounded-full bg-[var(--s2-good-bg)] px-2.5 py-1 text-[11px] font-bold text-[var(--s2-good-ink)]">
                          진행 중
                        </span>
                      ) : (
                        <button
                          onClick={() => resume(s.id)}
                          disabled={busy}
                          className="rounded-full border border-[var(--s2-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-gray)]"
                        >
                          다시 시작
                        </button>
                      )}
                      <button
                        onClick={() => removeSession(s.id, s.name)}
                        disabled={busy}
                        className="ml-auto rounded-full border border-[var(--s2-bad-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-bad-ink)] disabled:opacity-30"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Section>
      )}

      <p className="mt-7 text-center font-mono text-[11px] text-[var(--s2-faint)]">
        10초마다 자동 갱신 · 총 {TOTAL_STEPS}단계
      </p>
    </div>
  );
}

/* ── 조각들 ─────────────────────────────────────────────── */

/** 걸린 시간 표시 — 45초 · 4분 · 1시간 5분 */
function duration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}초`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}분`;
  return `${Math.floor(m / 60)}시간 ${m % 60}분`;
}

function short(id: string): string {
  return id.slice(0, 8);
}

/** 새 회차 기본 이름에 쓰는 오늘 날짜 (한국 시간) */
function todayKST(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}.${kst.getUTCMonth() + 1}.${kst.getUTCDate()}`;
}

/**
 * 날짜·시간 표시.
 * toLocaleString 을 쓰면 서버(Node)와 브라우저의 로케일 데이터가 달라
 * "오후"와 "PM"처럼 결과가 갈리고, 하이드레이션 불일치가 납니다.
 * 그래서 한국 시간으로 직접 조립합니다. 어디서 실행해도 결과가 같습니다.
 */
function when(iso: string): string {
  const kst = new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000);
  const mm = kst.getUTCMonth() + 1;
  const dd = kst.getUTCDate();
  const hh = String(kst.getUTCHours()).padStart(2, "0");
  const mi = String(kst.getUTCMinutes()).padStart(2, "0");
  return `${mm}/${dd} ${hh}:${mi}`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] px-3 py-4 text-center">
      <p className="font-mono text-[26px] font-bold leading-none text-[var(--s2-blue)]">
        {value}
      </p>
      <p className="mt-1.5 text-[12px] text-[var(--s2-body)]">{label}</p>
    </div>
  );
}

function Bar({
  value,
  max,
  thin,
}: {
  value: number;
  max: number;
  thin?: boolean;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <span
      className={`block w-full overflow-hidden rounded-full bg-[var(--s2-tint)] ${
        thin ? "h-1.5" : "mt-3 h-2"
      }`}
    >
      <span
        className="block h-full rounded-full bg-[var(--s2-blue)] transition-all"
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-extrabold tracking-[-0.01em]">
          {title}
        </h2>
        {note && (
          <span className="shrink-0 text-[11.5px] text-[var(--s2-faint)]">
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[16px] border border-dashed border-[var(--s2-line)] p-5 text-center text-[13px] text-[var(--s2-faint)]">
      {children}
    </p>
  );
}
