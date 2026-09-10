"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { pageElapsed, trackTime } from "@/app/lib/tracking";
import { useTracking } from "./Participation";

/** 페이지 아래 "다음" 링크 — 강의 중이면 이 페이지에 얼마나 머문 뒤 넘어갔는지 남깁니다 */
export default function NextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const tracking = useTracking();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (tracking) void trackTime("next", pathname, pageElapsed(), href);
      }}
    >
      {children}
    </Link>
  );
}
