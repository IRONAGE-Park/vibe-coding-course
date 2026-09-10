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
  updatedAt: number;
};
