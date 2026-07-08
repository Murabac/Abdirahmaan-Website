-- Migration 004: row level security policies

-- contact_messages
drop policy if exists "Allow anonymous insert" on abdirahmaan.contact_messages;
drop policy if exists "Allow authenticated read" on abdirahmaan.contact_messages;
drop policy if exists "Allow admin read contacts" on abdirahmaan.contact_messages;

create policy "Allow anonymous insert"
  on abdirahmaan.contact_messages
  for insert
  to anon
  with check (true);

create policy "Allow admin read contacts"
  on abdirahmaan.contact_messages
  for select
  to authenticated
  using (
    exists (
      select 1
      from abdirahmaan.users
      where id = auth.uid()
    )
  );

-- users
drop policy if exists "Users read own profile" on abdirahmaan.users;

create policy "Users read own profile"
  on abdirahmaan.users
  for select
  to authenticated
  using (auth.uid() = id);
