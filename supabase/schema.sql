-- Alpha Films — Anonymous community (no accounts)
-- Run in Supabase SQL Editor

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  film_id text not null,
  image_path text not null,
  caption text,
  created_at timestamptz not null default now()
);

create index if not exists community_posts_created_at_idx
  on public.community_posts (created_at desc);

alter table public.community_posts enable row level security;

drop policy if exists "Anyone can read community posts" on public.community_posts;
create policy "Anyone can read community posts"
  on public.community_posts for select
  using (true);

drop policy if exists "Anyone can create community posts" on public.community_posts;
create policy "Anyone can create community posts"
  on public.community_posts for insert
  with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert on public.community_posts to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('community', 'community', true)
on conflict (id) do nothing;

drop policy if exists "Public read community images" on storage.objects;
create policy "Public read community images"
  on storage.objects for select
  using (bucket_id = 'community');

drop policy if exists "Public upload community images" on storage.objects;
create policy "Public upload community images"
  on storage.objects for insert
  with check (
    bucket_id = 'community'
    and (storage.foldername(name))[1] = 'uploads'
  );
