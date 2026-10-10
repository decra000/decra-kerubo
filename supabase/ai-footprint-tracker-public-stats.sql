-- ============================================================
-- AI FOOTPRINT TRACKER — PUBLIC AGGREGATE STATS
--
-- RUN THIS IN THE AI FOOTPRINT TRACKER'S OWN SUPABASE PROJECT
-- (the one at https://jvdseuthdrskpelvceti.supabase.co, referenced
-- in the extension's lib/config.js) — NOT in this website's own
-- Supabase project. They are two separate projects.
--
-- What this does: adds one function, get_footprint_public_stats(),
-- that returns only aggregate numbers (sums and counts) across every
-- user's usage_events rows, never a single row, never a user_id,
-- never anything tied to one person. That's what decrakerubo.com's
-- "live stream" on the AI Footprint Tracker page will call.
--
-- It does NOT change any existing table, grant, or RLS policy on
-- usage_events — whatever already lets a signed-in user read/write
-- only their own rows keeps working exactly as it does today. This
-- only adds a new, narrow, read-only, aggregate-only entry point.
-- ============================================================

create or replace function public.get_footprint_public_stats()
returns table (
  alltime_wh numeric,
  alltime_ml numeric,
  alltime_gco2 numeric,
  alltime_messages bigint,
  alltime_users bigint,
  today_wh numeric,
  today_ml numeric,
  today_gco2 numeric,
  today_messages bigint,
  today_users bigint
)
language sql
security definer
set search_path = public
as $$
  select
    coalesce(sum(estimated_wh), 0)                                                   as alltime_wh,
    coalesce(sum(estimated_ml), 0)                                                   as alltime_ml,
    coalesce(sum(estimated_gco2), 0)                                                 as alltime_gco2,
    count(*)                                                                         as alltime_messages,
    count(distinct user_id)                                                          as alltime_users,
    coalesce(sum(estimated_wh) filter (where created_at >= date_trunc('day', now())), 0)   as today_wh,
    coalesce(sum(estimated_ml) filter (where created_at >= date_trunc('day', now())), 0)   as today_ml,
    coalesce(sum(estimated_gco2) filter (where created_at >= date_trunc('day', now())), 0) as today_gco2,
    count(*) filter (where created_at >= date_trunc('day', now()))                   as today_messages,
    count(distinct user_id) filter (where created_at >= date_trunc('day', now()))    as today_users
  from usage_events;
$$;

-- Anyone (including the site's anon key, already public inside the
-- extension) can call this function. They still can never select from
-- usage_events directly unless a policy already lets them, this
-- function is the only public door, and it only ever hands back sums.
grant execute on function public.get_footprint_public_stats() to anon, authenticated;
