-- Migration 005: test admin user (Supabase Auth + abdirahmaan.users)
--
-- Prerequisites:
--   - Run 006_fix_auth_user_trigger.sql first
--   - Authentication → Providers → Email enabled
--
-- If login returns HTTP 500, run 007_repair_auth_login.sql
--
-- Credentials:
--   Email:    admin@abdirahmaan.dev
--   Password: Admin123!
--
-- Safe to re-run: skips if email already exists

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

do $$
declare
  v_instance_id uuid;
  user_id uuid := gen_random_uuid();
  user_email text := 'admin@abdirahmaan.dev';
  user_password text := 'Admin123!';
  encrypted_pw text;
begin
  if exists (select 1 from auth.users where email = user_email) then
    raise notice 'Test user % already exists — skipping seed. Run 007 if login fails.', user_email;
    return;
  end if;

  select id into v_instance_id from auth.instances limit 1;
  if v_instance_id is null then
    v_instance_id := '00000000-0000-0000-0000-000000000000';
  end if;

  encrypted_pw := crypt(user_password, gen_salt('bf'));

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  values (
    v_instance_id,
    user_id,
    'authenticated',
    'authenticated',
    user_email,
    encrypted_pw,
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"display_name":"Test Admin"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    gen_random_uuid(),
    user_id,
    jsonb_build_object('sub', user_id::text, 'email', user_email),
    'email',
    user_email,
    now(),
    now(),
    now()
  );

  insert into abdirahmaan.users (id, email, display_name, role)
  values (user_id, user_email, 'Test Admin', 'admin')
  on conflict (id) do nothing;

  raise notice 'Test admin created: % / %', user_email, user_password;
end $$;
