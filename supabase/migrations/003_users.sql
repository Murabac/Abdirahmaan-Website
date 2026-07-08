-- Migration 003: admin users (linked to Supabase Auth)

create table if not exists abdirahmaan.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table abdirahmaan.users enable row level security;

grant select on abdirahmaan.users to authenticated;
grant all on abdirahmaan.users to service_role;
