-- 진행 현황 집계용 스키마
-- Supabase 대시보드 → SQL Editor 에 그대로 붙여넣고 한 번 실행하세요.
-- 여러 번 실행해도 안전합니다.

-- ── 표 ────────────────────────────────────────────────────

-- 방문자 한 명(정확히는 브라우저 하나)
create table if not exists public.visitors (
  id          text primary key,
  team        text,
  first_seen  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

-- 누가 어느 단계를 끝냈는지. 같은 사람이 같은 단계를 두 번 세지 않도록 복합 기본키를 씁니다.
create table if not exists public.completions (
  visitor_id  text not null,
  step_id     text not null,
  team        text,
  done_at     timestamptz not null default now(),
  primary key (visitor_id, step_id)
);

-- 관리자 로그인 시도 횟수 제한용
create table if not exists public.login_attempts (
  ip            text primary key,
  fails         int not null default 0,
  window_start  timestamptz not null default now()
);

create index if not exists completions_step_idx on public.completions (step_id);
create index if not exists completions_team_idx on public.completions (team);
create index if not exists visitors_team_idx    on public.visitors (team);
create index if not exists visitors_last_idx    on public.visitors (last_seen);

-- ── 잠그기 ────────────────────────────────────────────────
-- 이 표들은 서버 라우트가 service role 키로만 읽고 씁니다.
-- RLS 를 켜고 정책은 하나도 만들지 않습니다. 그러면 공개된 anon 키로는 아무것도 할 수 없고,
-- service role 은 RLS 를 우회하므로 서버만 접근할 수 있습니다.

alter table public.visitors       enable row level security;
alter table public.completions    enable row level security;
alter table public.login_attempts enable row level security;

revoke all on public.visitors       from anon, authenticated;
revoke all on public.completions    from anon, authenticated;
revoke all on public.login_attempts from anon, authenticated;

-- ── 집계 뷰 ───────────────────────────────────────────────
-- security_invoker = true 를 반드시 붙입니다.
-- 빼면 뷰가 뒤 표의 RLS 를 우회해서, anon 키로 내용이 새어 나갈 수 있습니다.

create or replace view public.step_counts
  with (security_invoker = true) as
  select step_id, count(*)::int as completions
  from public.completions
  group by step_id;

create or replace view public.team_members
  with (security_invoker = true) as
  select team, count(*)::int as members
  from public.visitors
  where team is not null and team <> ''
  group by team;

create or replace view public.team_steps
  with (security_invoker = true) as
  select
    team,
    count(distinct step_id)::int as done,
    array_agg(distinct step_id)  as step_ids
  from public.completions
  where team is not null and team <> ''
  group by team;

revoke all on public.step_counts  from anon, authenticated;
revoke all on public.team_members from anon, authenticated;
revoke all on public.team_steps   from anon, authenticated;
