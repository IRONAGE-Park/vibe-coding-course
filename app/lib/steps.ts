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
      { id: "plan-1", title: "Claude Code 열고 대화 시작하기" },
      { id: "plan-2", title: "문제 정의 — 한 문장으로" },
      { id: "plan-3", title: "기획서 만들기" },
      { id: "plan-4", title: "요구사항 명세" },
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
    key: "tools",
    num: "05",
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
