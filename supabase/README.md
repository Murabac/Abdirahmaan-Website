# Supabase SQL migrations

SQL changes are split into **numbered files** under `migrations/`. Run them **in order** in the Supabase **SQL Editor** (one file per query, or paste each file and Run).

## First-time setup

1. Run every file in `migrations/` from `001` upward (only files you have not run yet).
2. **Project Settings** → **Data API** → **Exposed schemas** → add `abdirahmaan`.
3. **Authentication** → **Providers** → enable **Email**.

### Migration list

| File | Purpose |
|------|---------|
| `001_extensions_and_schema.sql` | `pgcrypto`, `abdirahmaan` schema |
| `002_contact_messages.sql` | Contact form table |
| `003_users.sql` | Admin users table |
| `004_rls_policies.sql` | Row level security |
| `006_fix_auth_user_trigger.sql` | Auth trigger → `abdirahmaan.users` (not `public.users`) |
| `005_seed_test_admin.sql` | Test login user |
| `007_repair_auth_login.sql` | Fix login **HTTP 500** (NULL auth token columns, recreate test user) |
| `008_public_rest_api_views.sql` | Fix REST **406 Invalid schema: abdirahmaan** (public API views) |
| `009_projects_table.sql` | Projects table |
| `010_projects_rls.sql` | Projects RLS (public read, admin write) |
| `011_public_projects_view.sql` | Public REST view for projects |
| `012_seed_projects.sql` | Seed 18 portfolio projects |
| `013_project_images_storage.sql` | Storage bucket for uploaded project images |

Run **`006` before `005`**. If `005` failed with `relation "public.users" does not exist`, run **`006`**, then run **`005`** again.

If login returns **`500`** on `/auth/v1/token`, run **`007_repair_auth_login.sql`**.

If the dashboard shows **`406 Invalid schema: abdirahmaan`**, run **`008_public_rest_api_views.sql`**, then refresh the app.

**Optional (instead of 008):** Project Settings → **Data API** → **Exposed schemas** → add `abdirahmaan` (keep the comma-separated list including `public`).

**Test admin:** `admin@abdirahmaan.dev` / `Admin123!`

## Adding new database changes

**Do not edit old migration files** after they have been applied in Supabase.

1. Create the next file: `006_short_description.sql` (increment the number).
2. Put only the **new** SQL in that file (tables, columns, policies, seeds, etc.).
3. Document it in the table above in this README.
4. Run only the new file in the SQL Editor.

### Naming convention

```
NNN_snake_case_description.sql
```

Examples:

- `006_add_projects_table.sql`
- `007_projects_rls.sql`

## Legacy

`schema.sql` in this folder is deprecated (points to migrations). Use the numbered files instead.

## Cleanup (optional)

If you created tables in `public` earlier:

```sql
drop table if exists public.contact_messages;
```
