/**
 * 강의 스텝 목록 — 완료 집계의 기준이 되는 단일 출처.
 * id 는 각 페이지 StepCard 의 id 와 정확히 일치해야 합니다.
 */

export type Step = { id: string; title: string };
export type Chapter = { key: string; num: string; label: string; href: string; steps: Step[] };

export const CHAPTERS: Chapter[] = [
  {
    key: "setup",
    num: "01",
    label: "환경 설정",
    href: "/setup",
    steps: [
      { id: "setup-1", title: "Node.js 설치" },
      { id: "setup-2", title: "Claude Code CLI 설치 + 로그인" },
      { id: "setup-3", title: "GitHub 가입" },
      { id: "setup-4", title: "Git · GitHub CLI 설치 + 로그인" },
      { id: "setup-5", title: "Supabase 가입" },
      { id: "setup-6", title: "Vercel 가입" },
      { id: "setup-7", title: "Orca 설치" },
      { id: "setup-8", title: "내 프로젝트 만들고 Orca에 연결" },
      { id: "setup-9", title: "Orca에서 Claude Code 열기" },
      { id: "setup-10", title: "CLAUDE.md 붙여넣기" },
    ],
  },
  {
    key: "plan",
    num: "02",
    label: "문제 정의",
    href: "/plan",
    steps: [
      { id: "plan-1", title: "AI에게 인터뷰받기" },
      { id: "plan-2", title: "문제 정의 — 한 문장으로" },
      { id: "plan-3", title: "intent.md 만들기" },
      { id: "plan-4", title: "spec.md 만들기" },
      { id: "plan-5", title: "개발 지시 — 초안 만들기" },
    ],
  },
  {
    key: "build",
    num: "03",
    label: "초기 구축 · 첫 배포",
    href: "/build",
    steps: [
      { id: "build-1", title: "/goal 로 완료 조건 걸기" },
      { id: "build-2", title: "앱 초안 만들기" },
      { id: "build-3", title: "GitHub에 올리기" },
      { id: "build-4", title: "Vercel과 GitHub 연결하기" },
      { id: "build-5", title: "첫 배포 확인" },
    ],
  },
  {
    key: "update",
    num: "04",
    label: "업데이트 배포",
    href: "/update",
    steps: [
      { id: "update-1", title: "무엇을 고칠지 한 문장으로" },
      { id: "update-2", title: "결과 확인 — 눈으로 직접" },
      { id: "update-3", title: "막혔을 때" },
      { id: "update-4", title: "커밋하고 푸시하기" },
      { id: "update-5", title: "자동 배포 확인 · 되돌리기" },
    ],
  },
  {
    /* 강의가 끝난 뒤 스스로 하는 장 — 완료 집계 단계는 두지 않습니다 */
    key: "learn",
    num: "05",
    label: "배우는 법",
    href: "/learn",
    steps: [],
  },
  {
    key: "tools",
    num: "06",
    label: "유용한 도구들",
    href: "/tools",
    steps: [
      { id: "tools-1", title: "Supabase 연동" },
      { id: "tools-2", title: "CLAUDE.md" },
      { id: "tools-3", title: "Skills" },
      { id: "tools-4", title: "Harness" },
      { id: "tools-5", title: "다른 프로젝트 참고 · 뉴스" },
      { id: "tools-6", title: "AI 에이전트로 일상 업무까지" },
    ],
  },
];

export const ALL_STEPS: Step[] = CHAPTERS.flatMap((c) => c.steps);
export const STEP_IDS: string[] = ALL_STEPS.map((s) => s.id);
export const TOTAL_STEPS = STEP_IDS.length;

const STEP_ID_SET = new Set(STEP_IDS);
export function isTrackedStep(id: string | undefined): id is string {
  return !!id && STEP_ID_SET.has(id);
}

/* ── 순서 판단 ──────────────────────────────────────────────
   실습은 위에서부터 순서대로 하는 것을 전제로 합니다.
   참가자 화면의 잠금과 관리자 화면의 "지금 어느 단계" 가 모두 이 기준을 씁니다. */

export type StepInfo = {
  id: string;
  title: string;
  /** 몇 번째 챕터인지 ("01" 같은 표시용 문자열) */
  chapterNum: string;
  chapterLabel: string;
  /** 챕터 안에서 몇 번째인지 (1부터) */
  indexInChapter: number;
  /** 전체 31단계 중 몇 번째인지 (0부터) */
  order: number;
};

const INFO = new Map<string, StepInfo>();
let order = 0;
for (const c of CHAPTERS) {
  c.steps.forEach((s, i) => {
    INFO.set(s.id, {
      id: s.id,
      title: s.title,
      chapterNum: c.num,
      chapterLabel: c.label,
      indexInChapter: i + 1,
      order: order++,
    });
  });
}

export function stepInfo(id: string): StepInfo | undefined {
  return INFO.get(id);
}

/** 관리자 화면에 보여줄 한 줄 라벨 — "01 환경 설정 · 3. GitHub 가입" */
export function stepLabel(id: string): string {
  const s = INFO.get(id);
  if (!s) return id;
  return `${s.chapterNum} ${s.chapterLabel} · ${s.indexInChapter}. ${s.title}`;
}

/** 순서상 지금 해야 할 단계. 전부 끝냈으면 null */
export function currentStepId(done: Iterable<string>): string | null {
  const set = done instanceof Set ? done : new Set(done);
  return STEP_IDS.find((id) => !set.has(id)) ?? null;
}

export type StepState = "done" | "current" | "locked";

/** 이 단계가 지금 어떤 상태인지 */
export function stepStateOf(id: string, done: Set<string>): StepState {
  if (done.has(id)) return "done";
  return currentStepId(done) === id ? "current" : "locked";
}

/** 이 단계 바로 다음 단계의 id */
export function nextStepId(id: string): string | null {
  const i = STEP_IDS.indexOf(id);
  return i >= 0 && i + 1 < STEP_IDS.length ? STEP_IDS[i + 1] : null;
}

/* ── 페이지 ─────────────────────────────────────────────── */

/** 참가자 화면의 페이지 순서 — 홈, 각 장, 막혔을 때 */
export const PAGES: { href: string; label: string }[] = [
  { href: "/", label: "홈" },
  ...CHAPTERS.map((c) => ({ href: c.href, label: `${c.num} ${c.label}` })),
  { href: "/help", label: "막혔을 때" },
];

export function pageOrder(path: string): number {
  const i = PAGES.findIndex((p) => p.href === path);
  return i < 0 ? PAGES.length : i;
}

/** "01 환경 설정" 같은 페이지 이름. 모르는 주소면 주소를 그대로 돌려줍니다. */
export function pageLabel(path: string): string {
  return PAGES.find((p) => p.href === path)?.label ?? path;
}
