-- Migration 012: seed portfolio projects (auto-generated — run: node scripts/generate-projects-seed.mjs)
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
(
  'Import / export dispatch system',
  'Custom management system for a dispatch agency handling international goods — less manual entry, clearer tracking, and better transparency across the operation.',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['.NET', 'SQL', 'Business logic', 'Reporting'],
  'Full Stack',
  'primary',
  '#',
  '#',
  true,
  1
),
(
  'NGO & healthcare programme support',
  'Technical advisor and digital support for Liby Foundation (water and maternal care) and ACHealth (research and mental-health training workflows) across Somalia and Somaliland.',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Operations', 'Logistics', 'Training tooling', 'Field programmes'],
  'Software',
  'secondary',
  '#',
  '#',
  true,
  2
),
(
  'Broadcast monitoring & live production',
  'Multi-channel monitoring, incident response, live stream producing, and on-air graphics — keeping services stable and content broadcast-ready at Truecable TV.',
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Broadcast', 'Live streaming', 'Operations', 'Media design'],
  'Software',
  'accent',
  '#',
  '#',
  true,
  3
),
(
  'E-Commerce Platform',
  'A full-stack e-commerce solution with cart management, payment integration, and admin dashboard',
  'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
  'Full Stack',
  'primary',
  '#',
  '#',
  true,
  4
),
(
  'Fitness Tracking App',
  'Cross-platform mobile app for tracking workouts, nutrition, and progress with real-time sync',
  'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['React Native', 'Firebase', 'Redux', 'Expo'],
  'Mobile Apps',
  'secondary',
  '#',
  '#',
  true,
  5
),
(
  'Enterprise CRM System',
  'Custom CRM software with analytics, reporting, and automated workflows for business operations',
  'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['C#', '.NET', 'SQL Server', 'Azure'],
  'Software',
  'accent',
  '#',
  '#',
  true,
  6
),
(
  'Task Management App',
  'Collaborative task management tool with real-time updates, team features, and analytics',
  'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind'],
  'Web Development',
  'primary',
  '#',
  '#',
  true,
  7
),
(
  'Social Media App',
  'Native mobile application with real-time messaging, feeds, and media sharing capabilities',
  'https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Flutter', 'Dart', 'GraphQL', 'AWS'],
  'Mobile Apps',
  'secondary',
  '#',
  '#',
  true,
  8
),
(
  'Inventory Management System',
  'Desktop software for warehouse management with barcode scanning and automated reporting',
  'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Python', 'Django', 'MySQL', 'Docker'],
  'Software',
  'accent',
  '#',
  '#',
  true,
  9
),
(
  'Real Estate Platform',
  'Property listing website with advanced search, virtual tours, and mortgage calculator',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['React', 'Express', 'PostgreSQL', 'Google Maps'],
  'Web Development',
  'primary',
  '#',
  '#',
  false,
  10
),
(
  'Food Delivery App',
  'Complete food ordering system with restaurant management, delivery tracking, and payments',
  'https://images.unsplash.com/photo-1526367790999-0150786686a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
  'Full Stack',
  'secondary',
  '#',
  '#',
  false,
  11
),
(
  'HR Management Software',
  'Enterprise HR solution with employee management, payroll, and performance tracking',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Java', 'Spring Boot', 'MySQL', 'Angular'],
  'Software',
  'accent',
  '#',
  '#',
  false,
  12
),
(
  'Weather Forecast App',
  'Beautiful weather app with 7-day forecasts, weather alerts, and location-based updates',
  'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Swift', 'iOS', 'CoreLocation', 'WeatherAPI'],
  'Mobile Apps',
  'primary',
  '#',
  '#',
  false,
  13
),
(
  'Blog Platform',
  'Modern blogging platform with markdown editor, SEO optimization, and analytics dashboard',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Next.js', 'MDX', 'Prisma', 'Vercel'],
  'Web Development',
  'secondary',
  '#',
  '#',
  false,
  14
),
(
  'Expense Tracker',
  'Personal finance app with budget planning, expense categorization, and spending insights',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Kotlin', 'Android', 'Room DB', 'MPAndroidChart'],
  'Mobile Apps',
  'accent',
  '#',
  '#',
  false,
  15
),
(
  'Video Streaming Platform',
  'Netflix-style streaming service with video player, subscriptions, and content management',
  'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['React', 'Node.js', 'AWS S3', 'HLS'],
  'Full Stack',
  'primary',
  '#',
  '#',
  false,
  16
),
(
  'Project Management Tool',
  'Comprehensive project tracking software with Gantt charts, time tracking, and reporting',
  'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'Redis'],
  'Web Development',
  'secondary',
  '#',
  '#',
  false,
  17
),
(
  'Learning Management System',
  'Educational platform with courses, quizzes, certificates, and student progress tracking',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ARRAY['Python', 'FastAPI', 'PostgreSQL', 'Celery'],
  'Software',
  'accent',
  '#',
  '#',
  false,
  18
)
) as v(title, description, image_url, tags, category, color, github_url, demo_url, featured, sort_order)
where not exists (select 1 from abdirahmaan.projects limit 1);
