-- Migration 006: point Supabase "new user" trigger at abdirahmaan.users (not public.users)
--
-- Supabase often ships handle_new_user() → public.users. This project uses abdirahmaan.users.
-- Run this before 005 if 005 failed with "relation public.users does not exist".
-- Safe to re-run.

drop trigger if exists on_auth_user_created on auth.users;

drop function if exists public.handle_new_user();

create or replace function abdirahmaan.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = abdirahmaan, public
as $$
begin
  insert into abdirahmaan.users (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      ''
    ),
    'admin'
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(nullif(excluded.display_name, ''), abdirahmaan.users.display_name);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function abdirahmaan.handle_new_user();
