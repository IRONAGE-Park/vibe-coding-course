"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CHAPTERS, TOTAL_STEPS } from "@/app/lib/steps";
import type { Stats } from "@/app/lib/stats-types";

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

function Dashboard({ initialStats }: { initialStats: Stats }) {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>(initialStats);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      setStats(await res.json());
      setError("");
    } catch {
      setError("갱신하지 못했습니다. 화면의 숫자는 마지막으로 받은 값입니다.");
    }
  }, [router]);

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

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-7 md:px-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--s2-blue)]">
            ADMIN
          </p>
          <h1 className="mt-1 text-[23px] font-black tracking-[-0.02em]">
            진행 현황
          </h1>
        </div>
        <button
          onClick={logout}
          className="shrink-0 rounded-full border border-[var(--s2-line)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--s2-gray)]"
        >
          나가기
        </button>
      </header>

      {error && (
        <p className="mt-4 text-[13px] text-[var(--s2-bad-ink)]">{error}</p>
      )}

      {!stats.connected && (
        <p className="mt-5 rounded-[14px] border border-[var(--s2-warn-line)] bg-[var(--s2-warn-bg)] p-4 text-[13px] leading-[1.6] text-[var(--s2-warn-ink)]">
          저장소가 연결되지 않았습니다. Supabase를 연동하고 표를 만들면 숫자가
          채워집니다.
        </p>
      )}

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <Stat label="전체 방문" value={stats.totalVisitors} />
        <Stat label="오늘 방문" value={stats.todayVisitors} />
        <Stat label="참여 팀" value={stats.teams.length} />
      </div>

      <Section title="팀별 진행">
        {stats.teams.length === 0 ? (
          <Empty>아직 팀 이름을 입력한 참가자가 없습니다.</Empty>
        ) : (
          <div className="flex flex-col gap-2">
            {stats.teams.map((t) => (
              <div
                key={t.name}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-extrabold">{t.name}</span>
                  <span className="font-mono shrink-0 text-[12px] text-[var(--s2-faint)]">
                    {t.done} / {stats.totalSteps}
                  </span>
                </div>
                <Bar value={t.done} max={stats.totalSteps} />
                <p className="mt-2 text-[12.5px] text-[var(--s2-body)]">
                  {t.lastStep ? stepTitle(t.lastStep) : "아직 완료한 단계 없음"}
                  <span className="text-[var(--s2-faint)]">
                    {" · "}
                    {t.members}명
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {CHAPTERS.map((c) => (
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
                    <Bar value={n} max={Math.max(stats.totalVisitors, 1)} thin />
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

      <p className="mt-7 text-center font-mono text-[11px] text-[var(--s2-faint)]">
        10초마다 자동 갱신 · 총 {TOTAL_STEPS}단계
      </p>
    </div>
  );
}

/* ── 조각들 ─────────────────────────────────────────────── */

function stepTitle(id: string): string {
  for (const c of CHAPTERS) {
    const s = c.steps.find((x) => x.id === id);
    if (s) return `${c.num} ${s.title}`;
  }
  return id;
}

function Stat({ label, value }: { label: string; value: number }) {
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
        thin ? "h-1.5" : "mt-2 h-2"
      }`}
    >
      <span
        className="block h-full rounded-full bg-[var(--s2-blue)] transition-all"
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-2.5 text-[15px] font-extrabold tracking-[-0.01em]">
        {title}
      </h2>
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
