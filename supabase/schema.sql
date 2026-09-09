-- 진행 현황 집계용 스키마
-- Supabase 대시보드 → SQL Editor 에 그대로 붙여넣고 한 번 실행하세요.
--
-- ※ 주의: 아래 drop 문이 기존 기록을 모두 지웁니다.
--   처음 설치할 때 한 번만 실행하세요.
--   강의 기록이 쌓인 뒤에는 다시 실행하면 안 됩니다.
--   기록을 지우고 싶을 때는 관리자 화면의 "새 회차" 나 "회차 삭제" 를 쓰세요.

drop view  if exists public.visitor_progress cascade;
drop view  if exists public.step_counts      cascade;
drop view  if exists public.team_members     cascade;
drop view  if exists public.team_steps       cascade;
drop table if exists public.completions      cascade;
drop table if exists public.visitors         cascade;
drop table if exists public.login_attempts   cascade;
drop table if exists public.sessions         cascade;

-- ── 표 ────────────────────────────────────────────────────

-- 강의 회차. 한 번에 하나만 active 이고, 집계는 항상 특정 회차 안에서만 합니다.
create table public.sessions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now(),
  is_active   boolean not null default false
);

-- active 인 회차는 동시에 하나만 존재할 수 있습니다.
create unique index sessions_single_active
  on public.sessions (is_active) where (is_active);

-- 참가자 한 명(정확히는 브라우저 하나). 회차가 바뀌면 같은 브라우저도 새 줄로 시작합니다.
create table public.visitors (
  visitor_id  text not null,
  session_id  uuid not null references public.sessions (id) on delete cascade,
  name        text,
  first_seen  timestamptz not null default now(),
  last_seen   timestamptz not null default now(),
  primary key (visitor_id, session_id)
);

-- 누가 어느 단계를 끝냈는지. 같은 사람이 같은 단계를 두 번 세지 않도록 복합 기본키를 씁니다.
create table public.completions (
  visitor_id  text not null,
  session_id  uuid not null references public.sessions (id) on delete cascade,
  step_id     text not null,
  done_at     timestamptz not null default now(),
  primary key (visitor_id, session_id, step_id)
);

-- 관리자 로그인 시도 횟수 제한용
create table public.login_attempts (
  ip            text primary key,
  fails         int not null default 0,
  window_start  timestamptz not null default now()
);

create index completions_session_step_idx on public.completions (session_id, step_id);
create index visitors_session_last_idx    on public.visitors (session_id, last_seen);

-- 첫 회차를 하나 만들어 둡니다. 이름은 관리자 화면에서 바꿀 수 있습니다.
insert into public.sessions (name, is_active) values ('첫 번째 강의', true);

-- ── 잠그기 ────────────────────────────────────────────────
-- 이 표들은 서버 라우트가 비밀 키로만 읽고 씁니다.
-- RLS 를 켜고 정책은 하나도 만들지 않습니다. 그러면 공개된 키로는 아무것도 할 수 없고,
-- service role 은 RLS 를 우회하므로 서버만 접근할 수 있습니다.

alter table public.sessions       enable row level security;
alter table public.visitors       enable row level security;
alter table public.completions    enable row level security;
alter table public.login_attempts enable row level security;

revoke all on public.sessions       from anon, authenticated;
revoke all on public.visitors       from anon, authenticated;
revoke all on public.completions    from anon, authenticated;
revoke all on public.login_attempts from anon, authenticated;

-- ── 집계 뷰 ───────────────────────────────────────────────
-- security_invoker = true 를 반드시 붙입니다.
-- 빼면 뷰가 뒤 표의 RLS 를 우회해서, 공개 키로 내용이 새어 나갈 수 있습니다.

create view public.step_counts
  with (security_invoker = true) as
  select session_id, step_id, count(*)::int as completions
  from public.completions
  group by session_id, step_id;

-- 관리자 화면의 참가자 목록
create view public.visitor_progress
  with (security_invoker = true) as
  select
    v.session_id,
    v.visitor_id,
    v.name,
    v.first_seen,
    v.last_seen,
    coalesce(c.done, 0)::int as done
  from public.visitors v
  left join (
    select session_id, visitor_id, count(*)::int as done
    from public.completions
    group by session_id, visitor_id
  ) c on c.session_id = v.session_id and c.visitor_id = v.visitor_id;

revoke all on public.step_counts      from anon, authenticated;
revoke all on public.visitor_progress from anon, authenticated;
