"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  resumePageClock,
  startPageClock,
  takeUnsentPageTime,
  trackTime,
} from "@/app/lib/tracking";
import { useTracking } from "./Participation";

/** 1초도 안 되는 기록은 새로고침이나 잘못 누른 것이라 보내지 않습니다 */
const MIN_MS = 1000;

/**
 * 강의 중에 참가자가 각 페이지를 얼마나 보고 있었는지 남깁니다.
 * 다른 페이지로 넘어갈 때와 탭을 떠날 때, 그동안 쌓인 시간을 보냅니다.
 * 탭이 숨겨지는 순간(visibilitychange)이 브라우저가 요청을 확실히 보내주는
 * 마지막 때라서, 창을 닫는 경우도 거기서 잡힙니다.
 */
export default function PageTimer() {
  const pathname = usePathname();
  const tracking = useTracking();

  useEffect(() => {
    // 강의 중이 아니면 기록하지 않습니다. 관리자 화면은 강사 본인이라 뺍니다.
    if (!tracking || pathname.startsWith("/admin")) return;

    startPageClock();

    const flush = () => {
      const ms = takeUnsentPageTime();
      if (ms >= MIN_MS) void trackTime("page", pathname, ms);
    };
    const onVisibility = () => {
      if (document.hidden) flush();
      else resumePageClock();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [pathname, tracking]);

  return null;
}
