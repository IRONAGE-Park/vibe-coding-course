-- 머문 시간 · "다음" 클릭 기록 추가
-- 이미 schema.sql 로 표를 만들어 둔 프로젝트라면 이 파일만 SQL Editor 에서 한 번 실행하세요.
-- 기존 기록은 건드리지 않습니다. (schema.sql 은 맨 위 drop 문 때문에 다시 실행하면 안 됩니다)

-- ── 표 ────────────────────────────────────────────────────

-- 강의 중 참가자 화면에서 생긴 일.
--   page : 한 페이지에서 탭을 보고 있던 시간(duration_ms). 탭을 떠날 때마다 한 줄씩 쌓입니다.
--   next : 페이지 아래 "다음" 을 누름. path → target 으로 넘어갔고, 누르기 전까지 머문 시간이 duration_ms.
-- 참가자를 지우면 같이 지워지도록 visitors 에 외래키를 겁니다.
create table if not exists public.events (
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

create index if not exists events_session_kind_idx on public.events (session_id, kind);

alter table public.events enable row level security;
revoke all on public.events from anon, authenticated;

-- ── 집계 뷰 ───────────────────────────────────────────────
-- 사람마다 먼저 합친 뒤 중앙값을 냅니다. 한 사람이 자리를 비워 길어진 기록이 평균을 끌어올려도
-- 중앙값은 잘 흔들리지 않습니다.

-- 페이지별 머문 시간
create or replace view public.page_time_stats
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

-- "다음" 을 처음 누른 때. 같은 사람이 여러 번 눌러도 첫 번째만 셉니다.
create or replace view public.next_click_stats
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

-- 단계마다 걸린 시간 — 앞 단계를 끝낸 때부터 이 단계를 끝낸 때까지.
-- 첫 단계는 입장한 때부터 셉니다. completions 에 이미 있는 시각으로 계산하므로 새로 모을 것이 없습니다.
create or replace view public.step_time_stats
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
