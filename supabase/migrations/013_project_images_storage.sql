-- Migration 013: Supabase Storage bucket for project cover images
--
-- Public read (portfolio displays images). Admin-only upload/update/delete.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read project images" on storage.objects;
drop policy if exists "Admin upload project images" on storage.objects;
drop policy if exists "Admin update project images" on storage.objects;
drop policy if exists "Admin delete project images" on storage.objects;

create policy "Public read project images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

create policy "Admin upload project images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-images'
    and exists (select 1 from abdirahmaan.users where id = auth.uid())
  );

create policy "Admin update project images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'project-images'
    and exists (select 1 from abdirahmaan.users where id = auth.uid())
  );

create policy "Admin delete project images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'project-images'
    and exists (select 1 from abdirahmaan.users where id = auth.uid())
  );
