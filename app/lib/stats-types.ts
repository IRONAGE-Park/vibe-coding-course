export type TeamRow = {
  name: string;
  members: number;
  done: number;
  lastStep: string | null;
};

export type Stats = {
  connected: boolean;
  totalVisitors: number;
  todayVisitors: number;
  totalSteps: number;
  stepCounts: Record<string, number>;
  teams: TeamRow[];
  updatedAt: number;
};
