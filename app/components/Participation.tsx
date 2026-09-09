"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Participation } from "@/app/lib/participation";

/**
 * 지금 강의가 진행 중인지, 이 브라우저가 들어와 있는지를 화면 전체에 알려줍니다.
 * 값은 서버(레이아웃)에서 계산해 내려옵니다. 클라이언트가 따로 물어보지 않으므로
 * 첫 화면부터 버튼 유무가 확정되어 깜빡이지 않습니다.
 */
const Ctx = createContext<Participation>({
  running: false,
  sessionId: null,
  sessionName: null,
  joined: false,
});

export function ParticipationProvider({
  value,
  children,
}: {
  value: Participation;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useParticipation(): Participation {
  return useContext(Ctx);
}

/** 진행을 기록할 수 있는 상태인지 — 강의가 열려 있고 비밀번호를 통과했을 때만 */
export function useTracking(): boolean {
  const p = useParticipation();
  return p.running && p.joined;
}
