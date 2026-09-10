export type SessionRow = {
  id: string;
  name: string;
  createdAt: string;
  /** 지금 진행 중인 강의인지 */
  isRunning: boolean;
  startedAt: string | null;
  visitors: number;
};

export type VisitorRow = {
  id: string;
  name: string | null;
  done: number;
  /** 순서상 지금 하고 있는 단계. 전부 끝냈으면 null */
  currentStep: string | null;
  firstSeen: string;
  lastSeen: string;
};

/** 한 페이지에서 탭을 보고 있던 시간. 사람마다 합친 뒤의 중앙값·평균입니다. */
export type PageTime = {
  path: string;
  visitors: number;
  medianMs: number;
  avgMs: number;
};

/** 페이지 아래 "다음" 을 처음 누른 기록 */
export type NextClick = {
  path: string;
  target: string;
  visitors: number;
  /** 누르기 전까지 그 페이지에 머문 시간의 중앙값 */
  medianMs: number;
  firstAt: string;
  medianAt: string;
};

/** 앞 단계를 끝낸 때부터 이 단계를 끝낸 때까지 걸린 시간 */
export type StepTime = {
  visitors: number;
  medianS: number;
};

export type FeedbackKind = "question" | "idea";

/** 참가자가 오른쪽 아래 버튼으로 보낸 문의 · 개선 제안 */
export type FeedbackRow = {
  id: number;
  visitorId: string;
  kind: FeedbackKind;
  body: string;
  path: string;
  /** 보낼 때 보고 있던 영역의 id ("setup-3"). 레일이 없는 페이지면 null */
  sectionId: string | null;
  /** 보낼 때 보고 있던 곳 — "01 환경 설정 · 3. GitHub 가입" */
  context: string;
  createdAt: string;
  /** 강사가 확인한 때. 아직이면 null */
  resolvedAt: string | null;
};

export type Stats = {
  connected: boolean;
  /** 지금 진행 중인 강의가 있는지 */
  running: boolean;
  session: { id: string; name: string; createdAt: string } | null;
  sessions: SessionRow[];
  totalVisitors: number;
  todayVisitors: number;
  totalSteps: number;
  /** 참가자당 평균 완료 단계 수 */
  averageDone: number;
  stepCounts: Record<string, number>;
  visitors: VisitorRow[];
  pageTimes: PageTime[];
  nextClicks: NextClick[];
  stepTimes: Record<string, StepTime>;
  /** 새것이 먼저 */
  feedback: FeedbackRow[];
  updatedAt: number;
};
