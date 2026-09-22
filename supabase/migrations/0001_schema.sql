
create extension if not exists "pgcrypto";

create table if not exists public.daily_visitors (
  visitor_date date primary key default current_date,
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in ('visit', 'location_change', 'camera_change', 'date_pick', 'play_confirm', 'viewer_open', 'viewer_close')),
  location_idx int,
  camera_idx int,
  picked_date_iso text,
  visitor_session_id text,
  ip_address text,
  user_agent text,
  path text,
  detail jsonb not null default '{}'::jsonb
);

create index if not exists idx_activity_logs_created_at_desc
  on public.activity_logs (created_at desc);

create index if not exists idx_activity_logs_event_type
  on public.activity_logs (event_type);

create index if not exists idx_activity_logs_session
  on public.activity_logs (visitor_session_id);

create index if not exists idx_daily_visitors_date_desc
  on public.daily_visitors (visitor_date desc);

create or replace function public.protect_activity_log_columns()
returns trigger
language plpgsql
as $$
begin
  new.id := gen_random_uuid();
  new.created_at := now();
  if new.detail is null then
    new.detail := '{}'::jsonb;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_activity_logs_protect_columns on public.activity_logs;

create trigger trg_activity_logs_protect_columns
before insert on public.activity_logs
for each row
execute function public.protect_activity_log_columns();

create or replace function public.increment_daily_visitor()
returns trigger
language plpgsql
as $$
begin
  if new.event_type = 'visit' then
    insert into public.daily_visitors (visitor_date, count, updated_at)
    values (new.created_at::date, 1, now())
    on conflict (visitor_date) do update
      set count = public.daily_visitors.count + 1,
          updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_activity_logs_visit_increment on public.activity_logs;

create trigger trg_activity_logs_visit_increment
after insert on public.activity_logs
for each row
execute function public.increment_daily_visitor();

alter table public.daily_visitors enable row level security;
alter table public.activity_logs enable row level security;

drop policy if exists "logs select public" on public.activity_logs;
create policy "logs select public"
  on public.activity_logs for select
  using (true);

drop policy if exists "logs insert public" on public.activity_logs;
create policy "logs insert public"
  on public.activity_logs for insert
  with check (true);

drop policy if exists "daily visitors select public" on public.daily_visitors;
create policy "daily visitors select public"
  on public.daily_visitors for select
  using (true);
