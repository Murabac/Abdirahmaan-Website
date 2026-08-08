# Portfolio — Abdirahmaan Mire

Personal portfolio site for **Abdirahmaan Mire** (CV: senior software developer & project manager), implemented with React and Tailwind CSS v4.

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript  
- [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`  
- [Lucide React](https://lucide.dev/) for icons  
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) (loaded in `index.html`)
- [Supabase](https://supabase.com/) (contact form + admin auth)
- [React Router](https://reactrouter.com/) (portfolio + admin routes)

## Prerequisites

- Node.js 20+ recommended  

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Supabase (contact form)

The contact form saves messages to Supabase when environment variables are set.

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open **SQL Editor** and run each file in `supabase/migrations/` **in order** through **`012`** (see `supabase/README.md`). Auth order: `006` then `005`.
3. Run **`008_public_rest_api_views.sql`** (recommended), **or** add **`abdirahmaan`** under **Project Settings** → **Data API** → **Exposed schemas**.
4. Open **Project Settings** → **API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 2. API access to `abdirahmaan` data

Run **`008_public_rest_api_views.sql`** (recommended), or add **`abdirahmaan`** to **Exposed schemas** in the dashboard. Without one of these, the admin dashboard returns `406 Invalid schema: abdirahmaan`.

### 3. Local environment

```bash
cp .env.example .env
```

Fill in your URL and anon key, then restart `npm run dev`.

### 4. Netlify (production)

In **Site configuration** → **Environment variables**, add the same two variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Redeploy after saving. Vite inlines these at build time.

### 5. Enable email login

**Authentication** → **Providers** → **Email** → enable the Email provider.

### 6. Admin dashboard

| Route | Purpose |
|-------|---------|
| `/login` | Admin sign-in |
| `/dashboard` | Overview (message counts) |
| `/dashboard/messages` | Read contact form submissions |
| `/dashboard/projects` | Manage portfolio projects (add, edit, delete) |

**Test user** (created by `supabase/migrations/005_seed_test_admin.sql` if it does not already exist):

| Field | Value |
|-------|-------|
| Email | `admin@abdirahmaan.dev` |
| Password | `Admin123!` |

If the SQL seed fails (Supabase auth schema can vary by version), create the user manually under **Authentication** → **Users** with the same email/password, then run:

```sql
insert into abdirahmaan.users (id, email, display_name, role)
select id, email, 'Test Admin', 'admin'
from auth.users
where email = 'admin@abdirahmaan.dev'
on conflict (id) do nothing;
```

Change the test password in production after first login (Authentication → Users).

**Login returns HTTP 500?** Run `supabase/migrations/007_repair_auth_login.sql` in the SQL Editor, then try again with `admin@abdirahmaan.dev` / `Admin123!`.

**Alternative (most reliable):** Supabase Dashboard → **Authentication** → **Users** → **Add user** (email + password, auto-confirm). Then run:

```sql
insert into abdirahmaan.users (id, email, display_name, role)
select id, email, 'Test Admin', 'admin'
from auth.users
where email = 'your-email@example.com'
on conflict (id) do nothing;
```

### 7. Read messages in Supabase

**Table Editor** → schema **`abdirahmaan`** → `contact_messages`. Or use the dashboard at `/dashboard/messages` after logging in.

## Netlify

The repo includes `netlify.toml`: build runs `npm run build` and **publishes the `dist` folder**. That is required for Vite; if Netlify publishes the repository root instead, the browser loads `/src/main.tsx` and fails (wrong MIME type / not a built bundle).

In the Netlify UI, confirm **Build command** is `npm run build` and **Publish directory** is `dist` (or leave them blank so `netlify.toml` is used). Commit `netlify.toml`, push, and trigger a new deploy.

## Customize

- Replace the brand logo: `public/logo.png`.  
- Update contact details and social links in `src/components/Contact.tsx`.  
- Edit project copy and images in `src/components/Projects.tsx` and `src/components/AllProjects.tsx`.  

## License

Unless otherwise noted, content and code in this repository are provided by Abdirahmaan Mire. Add a `LICENSE` file when you decide how you want others to use the work.
