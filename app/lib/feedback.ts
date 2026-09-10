/** 문의 · 개선 제안 — 참가자 화면, 서버 라우트, 관리자 화면이 함께 씁니다 */

import type { FeedbackKind, FeedbackRow } from "@/app/lib/stats-types";

/** 화면에 보이는 종류 이름. 순서대로 선택 버튼이 놓입니다. */
export const FEEDBACK_KINDS: Record<FeedbackKind, string> = {
  question: "질문",
  idea: "개선 제안",
};

export function isFeedbackKind(value: unknown): value is FeedbackKind {
  return value === "question" || value === "idea";
}

/** 한 번에 보낼 수 있는 글자 수. 표의 check 제약과 같아야 합니다. */
export const FEEDBACK_MAX = 1000;

export const FEEDBACK_COLUMNS =
  "id, visitor_id, kind, body, path, section_id, context, created_at, resolved_at";

export type FeedbackDbRow = {
  id: number;
  visitor_id: string;
  kind: FeedbackKind;
  body: string;
  path: string;
  section_id: string | null;
  context: string;
  created_at: string;
  resolved_at: string | null;
};

export function toFeedbackRow(row: FeedbackDbRow): FeedbackRow {
  return {
    id: row.id,
    visitorId: row.visitor_id,
    kind: row.kind,
    body: row.body,
    path: row.path,
    sectionId: row.section_id,
    context: row.context,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at,
  };
}
