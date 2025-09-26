-- Aerostatic Productions Dashboard Schema
-- Created: 2025-09-22
-- This schema is designed to work without authentication

-- Drop existing tables if they exist (for clean migration)
drop table if exists schedule_items cascade;
drop table if exists assets cascade;
drop table if exists video_tasks cascade;
drop table if exists video_checklists cascade;
drop table if exists videos cascade;
drop table if exists audience_segments cascade;
drop table if exists channels cascade;
drop table if exists brands cascade;

-- Create brands table
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  color text,
  created_at timestamptz default now()
);

-- Create channels table
create table channels (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  platform text check (platform in ('tiktok','instagram','youtube','x','linkedin')),
  handle text,
  auth_status text default 'manual',
  unique(brand_id, platform)
);

-- Create audience_segments table
create table audience_segments (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  name text not null,
  pain_points text,
  is_active boolean default true
);

-- Create videos table
create table videos (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  game_type text check (game_type in ('awareness','conversion')) not null,
  status text check (status in ('idea','planning','editing','scheduled','posted')) default 'idea',
  title text,
  hook_text text,
  description text,
  cta text,
  tags text[] default '{}',
  length_target_sec int,
  music_ref text,
  reference_links text[] default '{}',
  ai_notes jsonb default '{}'::jsonb,
  kpis_planned jsonb default '{}'::jsonb,
  kpis_actual jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create video_checklists table
create table video_checklists (
  video_id uuid primary key references videos(id) on delete cascade,
  shareworthy_score int,
  curiosity_hook text,
  emotional_payoff text,
  tam_notes text,
  ontarget_share_notes text,
  ontarget_tam_notes text,
  problem_statement text,
  solution_statement text,
  tactical_value text
);

-- Create video_tasks table
create table video_tasks (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  kind text check (kind in ('script','shotlist','caption','thumbnail','voiceover')),
  content text,
  status text check (status in ('todo','doing','done')) default 'todo',
  order_index int default 0
);

-- Create assets table
create table assets (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  role text check (role in ('cover','raw','edit','subtitle','thumbnail')),
  url text,
  notes text
);

-- Create schedule_items table
create table schedule_items (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  channel_id uuid references channels(id) on delete set null,
  platform text,
  scheduled_at timestamptz,
  status text check (status in ('queued','posted','failed','canceled')) default 'queued'
);

-- Insert seed data for Aerostatic brands
insert into brands (name, slug, color) values
  ('Aerostatic', 'aerostatic', '#3B82F6'),
  ('TravelPact', 'travelpact', '#10B981'),
  ('Aerostatus', 'aerostatus', '#F59E0B');

-- Insert channels for each brand
insert into channels (brand_id, platform, handle, auth_status)
select
  b.id,
  unnest(array['tiktok', 'instagram', 'youtube']),
  case
    when unnest(array['tiktok', 'instagram', 'youtube']) = 'tiktok' then '@' || b.slug
    when unnest(array['tiktok', 'instagram', 'youtube']) = 'instagram' then '@' || b.slug
    when unnest(array['tiktok', 'instagram', 'youtube']) = 'youtube' then '@' || b.slug
  end,
  'manual'
from brands b;

-- Insert audience segments
insert into audience_segments (brand_id, name, pain_points, is_active)
select
  b.id,
  case b.slug
    when 'aerostatic' then 'Adventure Seekers & Balloon Enthusiasts'
    when 'travelpact' then 'Digital Nomads & Smart Travelers'
    when 'aerostatus' then 'Balloon Pilots & Operations Teams'
  end,
  case b.slug
    when 'aerostatic' then 'Want unique aerial experiences, need authentic ballooning content'
    when 'travelpact' then 'Need reliable travel planning, want to maximize their adventures'
    when 'aerostatus' then 'Need better operational tools, struggling with manual processes'
  end,
  true
from brands b;

-- Insert sample videos for Aerostatic
insert into videos (brand_id, game_type, status, title, hook_text, description, cta, tags, length_target_sec, kpis_planned)
select
  b.id,
  case (random() > 0.5)
    when true then 'awareness'
    else 'conversion'
  end,
  (array['idea','planning','editing','scheduled','posted'])[floor(random() * 5 + 1)],
  case b.slug
    when 'aerostatic' then 'The Magic of First Flight'
    when 'travelpact' then '5 Travel Hacks That Save Thousands'
    when 'aerostatus' then 'Why Every Pilot Needs This Tool'
  end,
  case b.slug
    when 'aerostatic' then 'Ever wondered what it''s like to float 3,000 feet above earth?'
    when 'travelpact' then 'I saved $5,000 on my last trip using these simple tricks'
    when 'aerostatus' then 'Stop losing money on cancelled flights - here''s how'
  end,
  case b.slug
    when 'aerostatic' then 'Experience the ancient art of ballooning through modern storytelling'
    when 'travelpact' then 'Smart travel planning for the modern adventurer'
    when 'aerostatus' then 'Professional tools for professional pilots'
  end,
  case b.slug
    when 'aerostatic' then 'Book your balloon adventure'
    when 'travelpact' then 'Try TravelPact free'
    when 'aerostatus' then 'Start your free trial'
  end,
  case b.slug
    when 'aerostatic' then array['ballooning','adventure','flying','aerial']
    when 'travelpact' then array['travel','nomad','planning','savings']
    when 'aerostatus' then array['aviation','pilots','tools','operations']
  end,
  60,
  '{"views_target": 10000, "engagement_target": 0.05}'::jsonb
from brands b;

-- Add indexes for performance
create index idx_videos_brand_id on videos(brand_id);
create index idx_videos_status on videos(status);
create index idx_schedule_items_scheduled_at on schedule_items(scheduled_at);
create index idx_channels_brand_id on channels(brand_id);