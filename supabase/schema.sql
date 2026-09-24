create table if not exists public.studio_projects (
	id text primary key,
	data jsonb not null,
	updated_at timestamptz not null default now()
);

create table if not exists public.studio_clients (
	id text primary key,
	data jsonb not null,
	updated_at timestamptz not null default now()
);

create table if not exists public.studio_inquiries (
	id text primary key,
	data jsonb not null,
	updated_at timestamptz not null default now()
);

create table if not exists public.studio_todos (
	id text primary key,
	data jsonb not null,
	updated_at timestamptz not null default now()
);

create table if not exists public.studio_settings (
	id bigint primary key check (id = 1),
	contact_info jsonb not null default '{}'::jsonb,
	services jsonb not null default '[]'::jsonb,
	career_program jsonb not null default '{}'::jsonb,
	updated_at timestamptz not null default now()
);

alter table public.studio_settings add column if not exists career_program jsonb not null default '{}'::jsonb;

drop policy if exists "studio projects backend access" on public.studio_projects;
drop policy if exists "studio clients backend access" on public.studio_clients;
drop policy if exists "studio inquiries backend access" on public.studio_inquiries;
drop policy if exists "studio todos backend access" on public.studio_todos;
drop policy if exists "studio settings backend access" on public.studio_settings;

alter table public.studio_projects enable row level security;
alter table public.studio_clients enable row level security;
alter table public.studio_inquiries enable row level security;
alter table public.studio_todos enable row level security;
alter table public.studio_settings enable row level security;

drop policy if exists "studio projects frontend access" on public.studio_projects;
drop policy if exists "studio clients frontend access" on public.studio_clients;
drop policy if exists "studio inquiries frontend access" on public.studio_inquiries;
drop policy if exists "studio todos frontend access" on public.studio_todos;
drop policy if exists "studio settings frontend access" on public.studio_settings;

create policy "studio projects frontend access" on public.studio_projects for all to anon, authenticated using (true) with check (true);
create policy "studio clients frontend access" on public.studio_clients for all to anon, authenticated using (true) with check (true);
create policy "studio inquiries frontend access" on public.studio_inquiries for all to anon, authenticated using (true) with check (true);
create policy "studio todos frontend access" on public.studio_todos for all to anon, authenticated using (true) with check (true);
create policy "studio settings frontend access" on public.studio_settings for all to anon, authenticated using (true) with check (true);
