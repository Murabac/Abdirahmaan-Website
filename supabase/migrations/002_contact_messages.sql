-- Migration 002: contact form messages table

create table if not exists abdirahmaan.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table abdirahmaan.contact_messages enable row level security;

grant insert on abdirahmaan.contact_messages to anon;
grant select on abdirahmaan.contact_messages to authenticated;
grant all on abdirahmaan.contact_messages to service_role;
