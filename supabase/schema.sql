-- ============================================================
-- メッセージカードアプリ DBスキーマ
-- Supabase SQL Editor で実行してください
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- profiles (ユーザー拡張プロファイル)
-- ============================================================
create table public.profiles (
  id                       uuid primary key references auth.users(id) on delete cascade,
  display_name             text,
  avatar_url               text,
  plan                     text not null default 'free' check (plan in ('free', 'pro')),
  credits                  integer not null default 0,
  stripe_customer_id       text unique,
  cards_created_this_month integer not null default 0,
  monthly_reset_at         timestamptz not null default date_trunc('month', now()) + interval '1 month',
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- templates (テンプレートマスター)
-- ============================================================
create table public.templates (
  id            uuid primary key default uuid_generate_v4(),
  slug          text not null unique,
  category      text not null,
  style         text not null,
  name          text not null,
  thumbnail_url text,
  is_premium    boolean not null default false,
  canvas_data   jsonb not null default '{}',
  tags          text[] not null default '{}',
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

-- RLS (public read)
alter table public.templates enable row level security;
create policy "Templates are publicly readable" on public.templates for select using (true);

-- ============================================================
-- cards (ユーザー作成カード)
-- ============================================================
create table public.cards (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  template_id   uuid references public.templates(id),
  title         text not null default '無題のカード',
  canvas_data   jsonb not null default '{}',
  size          text not null default 'a4_landscape',
  animation     text not null default 'none',
  status        text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  share_id      text unique,
  thumbnail_url text,
  is_favorite   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Indexes
create index idx_cards_user_id on public.cards(user_id);
create index idx_cards_share_id on public.cards(share_id) where share_id is not null;

-- RLS
alter table public.cards enable row level security;
create policy "Users can CRUD own cards" on public.cards
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Published cards are publicly readable" on public.cards
  for select using (status = 'published');

-- ============================================================
-- subscriptions
-- ============================================================
create table public.subscriptions (
  id                      uuid primary key default uuid_generate_v4(),
  user_id                 uuid not null references public.profiles(id) on delete cascade,
  stripe_subscription_id  text not null unique,
  status                  text not null,
  current_period_end      timestamptz not null,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- ============================================================
-- credit_transactions
-- ============================================================
create table public.credit_transactions (
  id                        uuid primary key default uuid_generate_v4(),
  user_id                   uuid not null references public.profiles(id) on delete cascade,
  amount                    integer not null,
  type                      text not null check (type in ('purchase', 'consume', 'refund', 'bonus')),
  description               text not null default '',
  stripe_payment_intent_id  text,
  created_at                timestamptz not null default now()
);

create index idx_credit_tx_user_id on public.credit_transactions(user_id);

alter table public.credit_transactions enable row level security;
create policy "Users can view own transactions" on public.credit_transactions
  for select using (auth.uid() = user_id);

-- ============================================================
-- ai_usage_logs
-- ============================================================
create table public.ai_usage_logs (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  feature          text not null,
  tokens_used      integer not null default 0,
  credits_consumed integer not null default 0,
  created_at       timestamptz not null default now()
);

create index idx_ai_logs_user_id on public.ai_usage_logs(user_id);
create index idx_ai_logs_created_at on public.ai_usage_logs(created_at);

alter table public.ai_usage_logs enable row level security;
create policy "Users can view own AI logs" on public.ai_usage_logs
  for select using (auth.uid() = user_id);

-- ============================================================
-- Storage buckets
-- ============================================================
insert into storage.buckets (id, name, public) values
  ('card-thumbnails', 'card-thumbnails', true),
  ('template-thumbnails', 'template-thumbnails', true),
  ('ai-images', 'ai-images', true)
on conflict do nothing;

create policy "Card thumbnails are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'card-thumbnails');

create policy "Users can upload card thumbnails"
  on storage.objects for insert
  with check (bucket_id = 'card-thumbnails' and auth.uid()::text = (storage.foldername(name))[1]);
