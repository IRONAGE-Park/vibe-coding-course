-- 참가자 문의 · 개선 제안 추가
-- 이미 schema.sql 로 표를 만들어 둔 프로젝트라면 이 파일만 SQL Editor 에서 한 번 실행하세요.
-- 기존 기록은 건드리지 않습니다. (schema.sql 은 맨 위 drop 문 때문에 다시 실행하면 안 됩니다)

-- 강의 중 참가자가 화면 오른쪽 아래 버튼으로 보낸 문의.
--   kind       : question(질문) · idea(개선 제안)
--   path       : 보낸 페이지 ("/setup")
--   section_id : 그때 보고 있던 영역 ("setup-3"). 레일이 없는 페이지면 비어 있습니다.
--   context    : 보낸 순간의 위치를 사람이 읽는 한 줄로 — "01 환경 설정 · 3. GitHub 가입"
--                단계 이름이 나중에 바뀌어도 그때 무엇을 보고 있었는지 남도록 글자로 저장합니다.
--   resolved_at: 강사가 "확인했어요" 를 누른 때
-- 참가자를 지우면 같이 지워지도록 visitors 에 외래키를 겁니다.
create table if not exists public.feedback (
  id           bigint generated always as identity primary key,
  visitor_id   text not null,
  session_id   uuid not null,
  kind         text not null check (kind in ('question', 'idea')),
  body         text not null check (char_length(body) between 1 and 1000),
  path         text not null,
  section_id   text,
  context      text not null,
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  foreign key (visitor_id, session_id)
    references public.visitors (visitor_id, session_id) on delete cascade
);

create index if not exists feedback_session_created_idx
  on public.feedback (session_id, created_at desc);

alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;
