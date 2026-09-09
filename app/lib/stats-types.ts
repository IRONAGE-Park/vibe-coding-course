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
  updatedAt: number;
};
