-- ============================================================
-- FitForge – Supabase SQL Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- 1. PROFILES
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  gender      text    default 'Male',
  weight      float   not null,
  height      float   not null,
  goal        text    default 'Maintenance',
  updated_at  timestamptz default now()
);

-- 2. CALORIES LOG
create table if not exists calories_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  date       date    not null default current_date,
  food       text    default 'Meal',
  calories   integer not null default 0,
  protein    integer not null default 0,
  created_at timestamptz default now()
);

-- 3. WORKOUTS LOG
create table if not exists workouts_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  date         date not null default current_date,
  workout_type text not null,
  duration     integer not null default 0,
  created_at   timestamptz default now()
);

-- 4. WEIGHT LOG
create table if not exists weight_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  date       date    not null default current_date,
  weight     float   not null,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS) — IMPORTANT: users see only their data
-- ============================================================

alter table profiles      enable row level security;
alter table calories_log  enable row level security;
alter table workouts_log  enable row level security;
alter table weight_log    enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can delete own profile"
  on profiles for delete using (auth.uid() = id);

-- Calories log policies
create policy "Users can view own calorie logs"
  on calories_log for select using (auth.uid() = user_id);

create policy "Users can insert own calorie logs"
  on calories_log for insert with check (auth.uid() = user_id);

create policy "Users can delete own calorie logs"
  on calories_log for delete using (auth.uid() = user_id);

-- Workouts log policies
create policy "Users can view own workout logs"
  on workouts_log for select using (auth.uid() = user_id);

create policy "Users can insert own workout logs"
  on workouts_log for insert with check (auth.uid() = user_id);

create policy "Users can delete own workout logs"
  on workouts_log for delete using (auth.uid() = user_id);

-- Weight log policies
create policy "Users can view own weight logs"
  on weight_log for select using (auth.uid() = user_id);

create policy "Users can insert own weight logs"
  on weight_log for insert with check (auth.uid() = user_id);

create policy "Users can delete own weight logs"
  on weight_log for delete using (auth.uid() = user_id);

-- ============================================================
-- Done! Run this and your database is fully set up.
-- ============================================================
