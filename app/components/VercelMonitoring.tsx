"use client";

import type { ComponentProps } from "react";
import { Analytics, type BeforeSend } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Web Analytics(방문 · 페이지뷰) 와 Speed Insights(체감 속도) 를 붙입니다.
 *
 * 관리자 화면은 강사 한 명만 보는 곳이라 수강생 통계를 흐리기만 하므로 보내지 않습니다.
 * beforeSend 는 함수라서 서버 컴포넌트인 layout 에서 바로 넘길 수 없어 여기서 감쌉니다.
 */

type SpeedBeforeSend = NonNullable<ComponentProps<typeof SpeedInsights>["beforeSend"]>;

function isAdmin(url: string): boolean {
  try {
    return new URL(url).pathname.startsWith("/admin");
  } catch {
    return false;
  }
}

const skipAdmin: BeforeSend = (event) => (isAdmin(event.url) ? null : event);
const skipAdminSpeed: SpeedBeforeSend = (event) => (isAdmin(event.url) ? null : event);

export default function VercelMonitoring() {
  return (
    <>
      <Analytics beforeSend={skipAdmin} />
      <SpeedInsights beforeSend={skipAdminSpeed} />
    </>
  );
}
