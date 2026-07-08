-- Migration 008: REST API access without exposing the abdirahmaan schema
--
-- Fixes: GET/POST .../rest/v1/contact_messages → 406 "Invalid schema: abdirahmaan"
-- Data remains in abdirahmaan.contact_messages; public.contact_messages is an API view.
--
-- After this migration, the app uses the default public schema for contact_messages.
-- Optional: you can still add abdirahmaan to Dashboard → Data API → Exposed schemas.

drop view if exists public.contact_messages;

create view public.contact_messages
with (security_invoker = true)
as
  select id, name, email, message, created_at
  from abdirahmaan.contact_messages;

grant select on public.contact_messages to authenticated;
grant insert on public.contact_messages to anon;

create or replace function public.contact_messages_insert()
returns trigger
language plpgsql
security definer
set search_path = abdirahmaan, public
as $$
begin
  insert into abdirahmaan.contact_messages (name, email, message)
  values (new.name, new.email, new.message);
  return new;
end;
$$;

drop trigger if exists contact_messages_insert on public.contact_messages;

create trigger contact_messages_insert
  instead of insert on public.contact_messages
  for each row
  execute function public.contact_messages_insert();
