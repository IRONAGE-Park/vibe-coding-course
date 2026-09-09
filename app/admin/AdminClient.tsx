"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CHAPTERS, TOTAL_STEPS, stepLabel } from "@/app/lib/steps";
import type { Stats, VisitorRow } from "@/app/lib/stats-types";

const REFRESH_MS = 10_000;

export default function AdminClient({
  initialAuthed,
  configured,
  initialStats,
}: {
  initialAuthed: boolean;
  configured: boolean;
  initialStats: Stats | null;
}) {
  const router = useRouter();

  if (initialAuthed && initialStats) {
    return <Dashboard initialStats={initialStats} />;
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
    <div className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-5 py-12">
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
          className="mt-3 w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3.5 text-[15px] font-bold text-white disabled:opacity-40"
        >
          {busy ? "확인 중" : "입장"}
        </button>
      </form>
    </div>
  );
}

/* ── 대시보드 ───────────────────────────────────────────── */

type Tab = "people" | "steps" | "sessions";

function Dashboard({ initialStats }: { initialStats: Stats }) {
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

  async function newSession() {
    const name = window.prompt(
      "새 강의 회차 이름을 적어주세요.\n지금까지의 기록은 지난 회차로 남고, 참가자 화면은 이름부터 다시 시작합니다.",
      `강의 ${todayKST()}`
    );
    if (name === null) return;

    if (
      await call("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
    ) {
      setViewing(null);
      setTab("people");
      await refresh(null);
    }
  }

  async function reopen(id: string) {
    if (
      !window.confirm("이 회차를 다시 열까요? 앞으로의 기록이 여기에 쌓입니다.")
    )
      return;
    if (
      await call("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activate: id }),
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

  const isViewingActive =
    !stats.session ||
    (stats.sessions.find((s) => s.id === stats.session?.id)?.isActive ?? false);

  const avgPct = stats.totalSteps
    ? Math.round((stats.averageDone / stats.totalSteps) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-7 md:px-6">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--s2-blue)]">
            ADMIN
          </p>
          <h1 className="mt-1 truncate text-[23px] font-black tracking-[-0.02em]">
            {stats.session?.name ?? "진행 현황"}
          </h1>
          <p className="mt-1 text-[12px] text-[var(--s2-faint)]">
            {isViewingActive ? "지금 열려 있는 회차" : "지난 회차를 보는 중"}
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
      <div className="mt-6 flex gap-1.5">
        {(
          [
            ["people", `참가자 ${stats.totalVisitors}`],
            ["steps", "단계별"],
            ["sessions", `회차 ${stats.sessions.length}`],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-full px-3 py-2 text-[13px] font-bold transition-colors ${
              tab === key
                ? "bg-[var(--s2-blue)] text-white"
                : "border border-[var(--s2-line)] text-[var(--s2-gray)]"
            }`}
          >
            {label}
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
                  className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-extrabold">
                        {v.name ?? "이름 안 밝힘"}
                      </p>
                      <p className="mt-1 truncate text-[12.5px] text-[var(--s2-body)]">
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
                      <p className="font-mono mt-0.5 truncate whitespace-nowrap text-[11px] text-[var(--s2-faint)]">
                        {short(v.id)} · {when(v.firstSeen)} 접속
                      </p>
                    </div>
                    <span className="font-mono shrink-0 text-[12.5px] font-bold text-[var(--s2-blue)]">
                      {v.done} / {stats.totalSteps}
                    </span>
                    <button
                      onClick={() => removeVisitor(v)}
                      disabled={busy || !isViewingActive}
                      title={
                        isViewingActive
                          ? ""
                          : "열려 있는 회차에서만 지울 수 있습니다"
                      }
                      className="shrink-0 rounded-full border border-[var(--s2-bad-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-bad-ink)] disabled:opacity-30"
                    >
                      제거
                    </button>
                  </div>
                  <Bar value={v.done} max={stats.totalSteps} />
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-[12px] leading-[1.6] text-[var(--s2-faint)]">
            사람이 아니라 브라우저 단위입니다. 한 사람이 폰과 노트북을 같이 쓰면
            두 줄로 보입니다.
          </p>
        </Section>
      )}

      {tab === "steps" &&
        CHAPTERS.map((c) => (
          <Section key={c.key} title={`${c.num} ${c.label}`}>
            <div className="overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)]">
              {c.steps.map((s, i) => {
                const n = stats.stepCounts[s.id] ?? 0;
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

      {tab === "sessions" && (
        <Section title="강의 회차">
          <button
            onClick={newSession}
            disabled={busy}
            className="w-full rounded-[14px] bg-[var(--s2-blue)] px-5 py-3 text-[14.5px] font-bold text-white disabled:opacity-40"
          >
            새 회차 시작하기
          </button>
          <p className="mt-2 text-[12.5px] leading-[1.6] text-[var(--s2-body)]">
            새 회차를 열면 지금까지의 기록은 지난 회차로 남고, 참가자 화면은
            이름부터 다시 시작합니다.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            {stats.sessions.map((s) => {
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setViewing(s.id);
                        void refresh(s.id);
                      }}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="block truncate text-[14.5px] font-extrabold">
                        {s.name}
                      </span>
                      <span className="mt-0.5 block text-[11.5px] text-[var(--s2-faint)]">
                        {when(s.createdAt)} · 참가자 {s.visitors}
                      </span>
                    </button>
                    {s.isActive ? (
                      <span className="shrink-0 rounded-full bg-[var(--s2-good-bg)] px-2.5 py-1 text-[11px] font-bold text-[var(--s2-good-ink)]">
                        열림
                      </span>
                    ) : (
                      <button
                        onClick={() => reopen(s.id)}
                        disabled={busy}
                        className="shrink-0 rounded-full border border-[var(--s2-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-gray)]"
                      >
                        다시 열기
                      </button>
                    )}
                    <button
                      onClick={() => removeSession(s.id, s.name)}
                      disabled={busy || stats.sessions.length <= 1}
                      className="shrink-0 rounded-full border border-[var(--s2-bad-line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--s2-bad-ink)] disabled:opacity-30"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })}
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
