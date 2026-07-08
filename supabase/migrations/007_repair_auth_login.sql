-- Migration 007: fix HTTP 500 on POST /auth/v1/token?grant_type=password
--
-- Cause: SQL-seeded auth.users rows often have NULL in token columns; GoTrue expects ''.
-- Run this if login returns 500 after migration 005.
-- Safe to re-run.

-- 1) Fix NULL string columns for all auth users
update auth.users
set confirmation_token = coalesce(confirmation_token, ''),
    recovery_token = coalesce(recovery_token, ''),
    email_change = coalesce(email_change, ''),
    email_change_token_new = coalesce(email_change_token_new, '')
where confirmation_token is null
   or recovery_token is null
   or email_change is null
   or email_change_token_new is null;

-- 2) Fix wrong instance_id (00000000... placeholder from old seed)
update auth.users u
set instance_id = i.id
from (select id from auth.instances limit 1) i
where u.instance_id = '00000000-0000-0000-0000-000000000000'
  and exists (select 1 from auth.instances);

-- 3) Re-create test admin with a valid auth row (optional but reliable)
do $$
declare
  v_instance_id uuid;
  v_user_id uuid := gen_random_uuid();
  v_email text := 'admin@abdirahmaan.dev';
  v_password text := 'Admin123!';
  v_encrypted_pw text;
begin
  select id into v_instance_id from auth.instances limit 1;
  if v_instance_id is null then
    v_instance_id := '00000000-0000-0000-0000-000000000000';
  end if;

  delete from abdirahmaan.users where email = v_email;
  delete from auth.identities where user_id in (select id from auth.users where email = v_email);
  delete from auth.users where email = v_email;

  v_encrypted_pw := crypt(v_password, gen_salt('bf'));

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
    v_user_id,
    'authenticated',
    'authenticated',
    v_email,
    v_encrypted_pw,
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
    v_user_id,
    jsonb_build_object('sub', v_user_id::text, 'email', v_email),
    'email',
    v_email,
    now(),
    now(),
    now()
  );

  insert into abdirahmaan.users (id, email, display_name, role)
  values (v_user_id, v_email, 'Test Admin', 'admin')
  on conflict (id) do update set
    email = excluded.email,
    display_name = excluded.display_name;

  raise notice 'Test admin repaired: % / %', v_email, v_password;
end $$;
