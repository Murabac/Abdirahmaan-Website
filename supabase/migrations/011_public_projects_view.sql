-- Migration 011: public REST API view for projects (same pattern as contact_messages)

drop view if exists public.projects;

create view public.projects
with (security_invoker = true)
as
  select
    id,
    title,
    description,
    image_url,
    tags,
    category,
    color,
    github_url,
    demo_url,
    featured,
    sort_order,
    created_at,
    updated_at
  from abdirahmaan.projects;

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

create or replace function public.projects_insert()
returns trigger
language plpgsql
security definer
set search_path = abdirahmaan, public
as $$
declare
  inserted abdirahmaan.projects%rowtype;
begin
  insert into abdirahmaan.projects (
    title,
    description,
    image_url,
    tags,
    category,
    color,
    github_url,
    demo_url,
    featured,
    sort_order
  )
  values (
    new.title,
    new.description,
    new.image_url,
    new.tags,
    new.category,
    new.color,
    new.github_url,
    new.demo_url,
    new.featured,
    new.sort_order
  )
  returning * into inserted;

  new.id := inserted.id;
  new.created_at := inserted.created_at;
  new.updated_at := inserted.updated_at;
  return new;
end;
$$;

create or replace function public.projects_update()
returns trigger
language plpgsql
security definer
set search_path = abdirahmaan, public
as $$
declare
  updated abdirahmaan.projects%rowtype;
begin
  update abdirahmaan.projects
  set
    title = new.title,
    description = new.description,
    image_url = new.image_url,
    tags = new.tags,
    category = new.category,
    color = new.color,
    github_url = new.github_url,
    demo_url = new.demo_url,
    featured = new.featured,
    sort_order = new.sort_order
  where id = old.id
  returning * into updated;

  new.id := updated.id;
  new.created_at := updated.created_at;
  new.updated_at := updated.updated_at;
  return new;
end;
$$;

create or replace function public.projects_delete()
returns trigger
language plpgsql
security definer
set search_path = abdirahmaan, public
as $$
begin
  delete from abdirahmaan.projects where id = old.id;
  return old;
end;
$$;

drop trigger if exists projects_insert on public.projects;
drop trigger if exists projects_update on public.projects;
drop trigger if exists projects_delete on public.projects;

create trigger projects_insert
  instead of insert on public.projects
  for each row
  execute function public.projects_insert();

create trigger projects_update
  instead of update on public.projects
  for each row
  execute function public.projects_update();

create trigger projects_delete
  instead of delete on public.projects
  for each row
  execute function public.projects_delete();
