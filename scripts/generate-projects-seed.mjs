import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ts = readFileSync(join(root, 'src/data/projectsSeed.ts'), 'utf8');
const match = ts.match(/export const SEED_PROJECTS[^=]*=\s*(\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not parse SEED_PROJECTS');

const projects = eval(match[1]);

const esc = (s) => s.replace(/'/g, "''");
const arr = (tags) => `ARRAY[${tags.map((t) => `'${esc(t)}'`).join(', ')}]`;

const values = projects
  .map(
    (p) => `(
  '${esc(p.title)}',
  '${esc(p.description)}',
  '${esc(p.image_url)}',
  ${arr(p.tags)},
  '${esc(p.category)}',
  '${p.color}',
  '${esc(p.github_url)}',
  '${esc(p.demo_url)}',
  ${p.featured},
  ${p.sort_order}
)`,
  )
  .join(',\n');

const sql = `-- Migration 012: seed portfolio projects (auto-generated — run: node scripts/generate-projects-seed.mjs)
-- Safe to re-run: skips when projects already exist

do $$
begin
  if exists (select 1 from abdirahmaan.projects limit 1) then
    raise notice 'Projects already seeded — skipping.';
    return;
  end if;
end $$;

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
select * from (values
${values}
) as v(title, description, image_url, tags, category, color, github_url, demo_url, featured, sort_order)
where not exists (select 1 from abdirahmaan.projects limit 1);
`;

writeFileSync(join(root, 'supabase/migrations/012_seed_projects.sql'), sql);
console.log('Wrote supabase/migrations/012_seed_projects.sql');
