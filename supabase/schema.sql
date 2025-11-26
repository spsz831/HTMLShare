-- Supabase数据库结构设计
-- HTMLShare V3 - 简化版本 (移除社交功能)

-- 启用必要的扩展
create extension if not exists "uuid-ossp";

-- 用户配置表 (扩展auth.users)
create table public.profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 代码片段表
create table public.snippets (
  id uuid default uuid_generate_v4() primary key,
  title text not null check (char_length(title) > 0),
  content text not null,
  language text not null default 'text',
  description text,
  user_id uuid references public.profiles(id) on delete cascade,
  is_public boolean default true,
  is_featured boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 标签表
create table public.tags (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null check (char_length(name) > 0),
  color text default '#3b82f6',
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 代码片段标签关联表
create table public.snippet_tags (
  snippet_id uuid references public.snippets(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (snippet_id, tag_id)
);

-- 评论表
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  content text not null check (char_length(content) > 0),
  user_id uuid references public.profiles(id) on delete cascade,
  snippet_id uuid references public.snippets(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建索引
create index snippets_user_id_idx on public.snippets(user_id);
create index snippets_language_idx on public.snippets(language);
create index snippets_created_at_idx on public.snippets(created_at desc);
create index snippets_is_public_idx on public.snippets(is_public);
create index snippets_is_featured_idx on public.snippets(is_featured);
create index comments_snippet_id_idx on public.comments(snippet_id);
create index comments_user_id_idx on public.comments(user_id);
create index tags_name_idx on public.tags(name);

-- 全文搜索索引
create index snippets_content_fts_idx on public.snippets using gin(to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || content));

-- 触发器函数：更新时间戳
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- 创建触发器
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_snippets_updated_at
  before update on public.snippets
  for each row execute function public.handle_updated_at();

create trigger handle_comments_updated_at
  before update on public.comments
  for each row execute function public.handle_updated_at();

-- Row Level Security (RLS) 策略
alter table public.profiles enable row level security;
alter table public.snippets enable row level security;
alter table public.comments enable row level security;
alter table public.tags enable row level security;
alter table public.snippet_tags enable row level security;

-- 用户配置策略
create policy "Users can view all profiles" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- 代码片段策略
create policy "Public snippets are viewable by everyone" on public.snippets
  for select using (is_public = true);

create policy "Users can view own snippets" on public.snippets
  for select using (auth.uid() = user_id);

create policy "Users can create snippets" on public.snippets
  for insert with check (auth.uid() = user_id);

create policy "Users can update own snippets" on public.snippets
  for update using (auth.uid() = user_id);

create policy "Users can delete own snippets" on public.snippets
  for delete using (auth.uid() = user_id);

-- 评论策略
create policy "Comments are viewable by everyone" on public.comments
  for select using (true);

create policy "Users can create comments" on public.comments
  for insert with check (auth.uid() = user_id);

create policy "Users can update own comments" on public.comments
  for update using (auth.uid() = user_id);

create policy "Users can delete own comments" on public.comments
  for delete using (auth.uid() = user_id);

-- 标签策略 (只读)
create policy "Tags are viewable by everyone" on public.tags
  for select using (true);

create policy "Tags relations are viewable by everyone" on public.snippet_tags
  for select using (true);

-- 函数：获取热门代码片段
create or replace function public.get_trending_snippets(
  limit_count integer default 10,
  days_back integer default 7
)
returns table (
  id uuid,
  title text,
  language text,
  view_count integer,
  created_at timestamp with time zone
) as $$
begin
  return query
  select s.id, s.title, s.language, s.view_count, s.created_at
  from public.snippets s
  where s.is_public = true
    and s.created_at >= now() - interval '1 day' * days_back
  order by s.view_count desc, s.created_at desc
  limit limit_count;
end;
$$ language plpgsql security definer;

-- 函数：全文搜索代码片段
create or replace function public.search_snippets(
  search_query text,
  limit_count integer default 20
)
returns table (
  id uuid,
  title text,
  description text,
  language text,
  content text,
  user_id uuid,
  created_at timestamp with time zone,
  rank real
) as $$
begin
  return query
  select
    s.id, s.title, s.description, s.language, s.content, s.user_id, s.created_at,
    ts_rank(to_tsvector('english', s.title || ' ' || coalesce(s.description, '') || ' ' || s.content), plainto_tsquery('english', search_query)) as rank
  from public.snippets s
  where s.is_public = true
    and to_tsvector('english', s.title || ' ' || coalesce(s.description, '') || ' ' || s.content) @@ plainto_tsquery('english', search_query)
  order by rank desc, s.created_at desc
  limit limit_count;
end;
$$ language plpgsql security definer;

-- 插入一些默认标签
insert into public.tags (name, color, description) values
  ('JavaScript', '#f7df1e', 'JavaScript代码片段'),
  ('TypeScript', '#3178c6', 'TypeScript代码片段'),
  ('Python', '#3776ab', 'Python代码片段'),
  ('HTML', '#e34f26', 'HTML代码片段'),
  ('CSS', '#1572b6', 'CSS样式代码'),
  ('React', '#61dafb', 'React组件和代码'),
  ('Next.js', '#000000', 'Next.js相关代码'),
  ('Node.js', '#339933', 'Node.js服务端代码'),
  ('Vue.js', '#4fc08d', 'Vue.js组件和代码'),
  ('Tailwind', '#06b6d4', 'Tailwind CSS样式'),
  ('Algorithm', '#ff6b6b', '算法和数据结构'),
  ('Utility', '#ffa726', '实用工具函数'),
  ('Tutorial', '#ab47bc', '教程和示例代码'),
  ('Snippet', '#66bb6a', '代码片段'),
  ('Component', '#42a5f5', '组件代码');