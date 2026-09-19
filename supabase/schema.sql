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
	updated_at timestamptz not null default now()
);

alter table public.studio_projects enable row level security;
alter table public.studio_clients enable row level security;
alter table public.studio_inquiries enable row level security;
alter table public.studio_todos enable row level security;
alter table public.studio_settings enable row level security;

create policy "studio projects backend access" on public.studio_projects for all using (true) with check (true);
create policy "studio clients backend access" on public.studio_clients for all using (true) with check (true);
create policy "studio inquiries backend access" on public.studio_inquiries for all using (true) with check (true);
create policy "studio todos backend access" on public.studio_todos for all using (true) with check (true);
create policy "studio settings backend access" on public.studio_settings for all using (true) with check (true);
