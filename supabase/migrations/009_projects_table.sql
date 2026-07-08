-- Migration 009: portfolio projects table

create table if not exists abdirahmaan.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text not null,
  tags text[] not null default '{}',
  category text not null,
  color text not null default 'primary' check (color in ('primary', 'secondary', 'accent')),
  github_url text not null default '#',
  demo_url text not null default '#',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_featured_sort_idx
  on abdirahmaan.projects (featured, sort_order);

alter table abdirahmaan.projects enable row level security;

grant select on abdirahmaan.projects to anon, authenticated;
grant insert, update, delete on abdirahmaan.projects to authenticated;
grant all on abdirahmaan.projects to service_role;

create or replace function abdirahmaan.projects_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on abdirahmaan.projects;

create trigger projects_set_updated_at
  before update on abdirahmaan.projects
  for each row
  execute function abdirahmaan.projects_set_updated_at();
