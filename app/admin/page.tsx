import type { Metadata } from "next";
import { isAdmin } from "@/app/lib/auth";
import { getStats } from "@/app/lib/stats";
import { LECTURE_NOTES } from "@/app/lib/lecture-notes";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "진행 현황 | 관리자",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 쿠키 검증은 서버에서만 합니다. 비밀번호는 클라이언트로 내려가지 않습니다.
  const authed = await isAdmin();

  return (
    <AdminClient
      initialAuthed={authed}
      configured={Boolean(process.env.ADMIN_PASSWORD)}
      initialStats={authed ? await getStats() : null}
      notes={authed ? LECTURE_NOTES : null}
    />
  );
}
