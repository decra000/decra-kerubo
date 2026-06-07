-- ============================================
-- DECRA KERUBO ADVISORY PLATFORM — DB SCHEMA
-- Run this in your Supabase SQL editor
-- ============================================

-- Bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  organization text,
  website text,
  industry text,
  team_size text,
  primary_challenge text not null,
  desired_outcome text not null,
  consultation_type text not null,
  scheduled_at timestamptz not null,
  google_event_id text,
  meet_link text,
  status text default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Leads table
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  organization text,
  source text not null,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- Contact messages
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  organization text,
  message text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table bookings enable row level security;
alter table leads enable row level security;
alter table subscribers enable row level security;
alter table messages enable row level security;

-- Policies: only service role can read (admin dashboard uses service key)
create policy "Service role full access bookings"
  on bookings for all
  using (true)
  with check (true);

create policy "Service role full access leads"
  on leads for all
  using (true)
  with check (true);

create policy "Service role full access subscribers"
  on subscribers for all
  using (true)
  with check (true);

create policy "Service role full access messages"
  on messages for all
  using (true)
  with check (true);

-- Public can insert (for form submissions)
create policy "Public can insert bookings"
  on bookings for insert
  with check (true);

create policy "Public can insert leads"
  on leads for insert
  with check (true);

create policy "Public can insert subscribers"
  on subscribers for insert
  with check (true);

create policy "Public can insert messages"
  on messages for insert
  with check (true);
