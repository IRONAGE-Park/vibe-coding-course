-- 진행 현황 집계용 스키마
-- Supabase 대시보드 → SQL Editor 에 그대로 붙여넣고 한 번 실행하세요.
--
-- ※ 주의: 아래 drop 문이 기존 기록을 모두 지웁니다.
--   처음 설치할 때 한 번만 실행하세요.
--   강의 기록이 쌓인 뒤에는 다시 실행하면 안 됩니다.
--   기록을 지우고 싶을 때는 관리자 화면의 "새 회차" 나 "회차 삭제" 를 쓰세요.
--   이미 설치한 뒤 머문 시간 기록만 더하려면 events.sql 만 실행하세요.

drop view  if exists public.page_time_stats  cascade;
drop view  if exists public.next_click_stats cascade;
drop view  if exists public.step_time_stats  cascade;
drop view  if exists public.visitor_progress cascade;
drop view  if exists public.step_counts      cascade;
drop view  if exists public.team_members     cascade;
drop view  if exists public.team_steps       cascade;
drop table if exists public.events           cascade;
drop table if exists public.completions      cascade;
drop table if exists public.visitors         cascade;
drop table if exists public.login_attempts   cascade;
drop table if exists public.sessions         cascade;

-- ── 표 ────────────────────────────────────────────────────

-- 강의 회차.
-- is_running 이 true 인 회차가 "지금 진행 중인 강의" 입니다. 한 번에 하나뿐입니다.
-- 진행 중인 강의가 하나도 없는 상태가 기본이며, 그때 사이트는 그냥 열린 안내서가 됩니다.
-- 참가자는 강의가 진행 중일 때만 비밀번호를 넣고 들어와 진행을 기록합니다.
create table public.sessions (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  created_at     timestamptz not null default now(),
  started_at     timestamptz,
  is_running     boolean not null default false,
  -- 참가자용 비밀번호. 원문은 저장하지 않고 scrypt 해시만 둡니다.
  password_hash  text,
  password_salt  text
);

-- 진행 중인 강의는 동시에 하나만 존재할 수 있습니다.
create unique index sessions_single_running
  on public.sessions (is_running) where (is_running);

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

-- 회차는 미리 만들지 않습니다.
-- 강사가 관리자 화면에서 "강의 시작" 을 눌러 비밀번호를 정하는 순간 만들어집니다.

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
    coalesce(c.done, 0)::int as done,
    coalesce(c.step_ids, array[]::text[]) as step_ids
  from public.visitors v
  left join (
    select
      session_id,
      visitor_id,
      count(*)::int      as done,
      array_agg(step_id) as step_ids
    from public.completions
    group by session_id, visitor_id
  ) c on c.session_id = v.session_id and c.visitor_id = v.visitor_id;

revoke all on public.step_counts      from anon, authenticated;
revoke all on public.visitor_progress from anon, authenticated;

-- ── 머문 시간 · "다음" 클릭 ───────────────────────────────
-- 내용은 events.sql 과 같습니다. 처음 설치할 때는 여기서 함께 만들어집니다.

create table public.events (
  id           bigint generated always as identity primary key,
  visitor_id   text not null,
  session_id   uuid not null,
  kind         text not null check (kind in ('page', 'next')),
  path         text not null,
  target       text,
  duration_ms  int  not null check (duration_ms >= 0),
  at           timestamptz not null default now(),
  foreign key (visitor_id, session_id)
    references public.visitors (visitor_id, session_id) on delete cascade
);

create index events_session_kind_idx on public.events (session_id, kind);

alter table public.events enable row level security;
revoke all on public.events from anon, authenticated;

create view public.page_time_stats
  with (security_invoker = true) as
  select
    session_id,
    path,
    count(*)::int                                                  as visitors,
    (percentile_cont(0.5) within group (order by active_ms))::int as median_ms,
    avg(active_ms)::int                                            as avg_ms
  from (
    select session_id, visitor_id, path, sum(duration_ms)::bigint as active_ms
    from public.events
    where kind = 'page'
    group by session_id, visitor_id, path
  ) per_visitor
  group by session_id, path;

create view public.next_click_stats
  with (security_invoker = true) as
  select
    session_id,
    path,
    target,
    count(*)::int                                                  as visitors,
    (percentile_cont(0.5) within group (order by ms_before))::int as median_ms,
    min(first_at)                                                  as first_at,
    percentile_disc(0.5) within group (order by first_at)         as median_at
  from (
    select
      session_id,
      visitor_id,
      path,
      target,
      min(at)                                  as first_at,
      (array_agg(duration_ms order by at))[1]  as ms_before
    from public.events
    where kind = 'next'
    group by session_id, visitor_id, path, target
  ) first_click
  group by session_id, path, target;

create view public.step_time_stats
  with (security_invoker = true) as
  select
    session_id,
    step_id,
    count(*)::int                                             as visitors,
    (percentile_cont(0.5) within group (order by secs))::int as median_s
  from (
    select
      c.session_id,
      c.step_id,
      extract(epoch from c.done_at - coalesce(
        lag(c.done_at) over (
          partition by c.session_id, c.visitor_id order by c.done_at
        ),
        v.first_seen
      )) as secs
    from public.completions c
    join public.visitors v
      on v.session_id = c.session_id and v.visitor_id = c.visitor_id
  ) gaps
  where secs >= 0
  group by session_id, step_id;

revoke all on public.page_time_stats  from anon, authenticated;
revoke all on public.next_click_stats from anon, authenticated;
revoke all on public.step_time_stats  from anon, authenticated;
