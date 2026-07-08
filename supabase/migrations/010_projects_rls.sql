-- Migration 010: projects RLS policies

drop policy if exists "Allow public read projects" on abdirahmaan.projects;
drop policy if exists "Allow admin insert projects" on abdirahmaan.projects;
drop policy if exists "Allow admin update projects" on abdirahmaan.projects;
drop policy if exists "Allow admin delete projects" on abdirahmaan.projects;

create policy "Allow public read projects"
  on abdirahmaan.projects
  for select
  to anon, authenticated
  using (true);

create policy "Allow admin insert projects"
  on abdirahmaan.projects
  for insert
  to authenticated
  with check (
    exists (select 1 from abdirahmaan.users where id = auth.uid())
  );

create policy "Allow admin update projects"
  on abdirahmaan.projects
  for update
  to authenticated
  using (
    exists (select 1 from abdirahmaan.users where id = auth.uid())
  )
  with check (
    exists (select 1 from abdirahmaan.users where id = auth.uid())
  );

create policy "Allow admin delete projects"
  on abdirahmaan.projects
  for delete
  to authenticated
  using (
    exists (select 1 from abdirahmaan.users where id = auth.uid())
  );
