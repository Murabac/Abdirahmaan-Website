import type { ProjectInput } from '../types/database';

/** Default portfolio projects — used for SQL seed and client fallback. */
export const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Apps',
  'Software',
  'Full Stack',
] as const;

export const PROJECT_COLORS = ['primary', 'secondary', 'accent'] as const;

export const SEED_PROJECTS: ProjectInput[] = [
  {
    title: 'Import / export dispatch system',
    description:
      'Custom management system for a dispatch agency handling international goods — less manual entry, clearer tracking, and better transparency across the operation.',
    image_url:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['.NET', 'SQL', 'Business logic', 'Reporting'],
    category: 'Full Stack',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 1,
  },
  {
    title: 'NGO & healthcare programme support',
    description:
      'Technical advisor and digital support for Liby Foundation (water and maternal care) and ACHealth (research and mental-health training workflows) across Somalia and Somaliland.',
    image_url:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Operations', 'Logistics', 'Training tooling', 'Field programmes'],
    category: 'Software',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 2,
  },
  {
    title: 'Broadcast monitoring & live production',
    description:
      'Multi-channel monitoring, incident response, live stream producing, and on-air graphics — keeping services stable and content broadcast-ready at Truecable TV.',
    image_url:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Broadcast', 'Live streaming', 'Operations', 'Media design'],
    category: 'Software',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 3,
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with cart management, payment integration, and admin dashboard',
    image_url:
      'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 4,
  },
  {
    title: 'Fitness Tracking App',
    description:
      'Cross-platform mobile app for tracking workouts, nutrition, and progress with real-time sync',
    image_url:
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'Mobile Apps',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 5,
  },
  {
    title: 'Enterprise CRM System',
    description:
      'Custom CRM software with analytics, reporting, and automated workflows for business operations',
    image_url:
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['C#', '.NET', 'SQL Server', 'Azure'],
    category: 'Software',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 6,
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team features, and analytics',
    image_url:
      'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind'],
    category: 'Web Development',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 7,
  },
  {
    title: 'Social Media App',
    description: 'Native mobile application with real-time messaging, feeds, and media sharing capabilities',
    image_url:
      'https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Flutter', 'Dart', 'GraphQL', 'AWS'],
    category: 'Mobile Apps',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 8,
  },
  {
    title: 'Inventory Management System',
    description: 'Desktop software for warehouse management with barcode scanning and automated reporting',
    image_url:
      'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Python', 'Django', 'MySQL', 'Docker'],
    category: 'Software',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: true,
    sort_order: 9,
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing website with advanced search, virtual tours, and mortgage calculator',
    image_url:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React', 'Express', 'PostgreSQL', 'Google Maps'],
    category: 'Web Development',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 10,
  },
  {
    title: 'Food Delivery App',
    description: 'Complete food ordering system with restaurant management, delivery tracking, and payments',
    image_url:
      'https://images.unsplash.com/photo-1526367790999-0150786686a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Full Stack',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 11,
  },
  {
    title: 'HR Management Software',
    description: 'Enterprise HR solution with employee management, payroll, and performance tracking',
    image_url:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
    category: 'Software',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 12,
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with 7-day forecasts, weather alerts, and location-based updates',
    image_url:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Swift', 'iOS', 'CoreLocation', 'WeatherAPI'],
    category: 'Mobile Apps',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 13,
  },
  {
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown editor, SEO optimization, and analytics dashboard',
    image_url:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Next.js', 'MDX', 'Prisma', 'Vercel'],
    category: 'Web Development',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 14,
  },
  {
    title: 'Expense Tracker',
    description: 'Personal finance app with budget planning, expense categorization, and spending insights',
    image_url:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Kotlin', 'Android', 'Room DB', 'MPAndroidChart'],
    category: 'Mobile Apps',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 15,
  },
  {
    title: 'Video Streaming Platform',
    description: 'Netflix-style streaming service with video player, subscriptions, and content management',
    image_url:
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['React', 'Node.js', 'AWS S3', 'HLS'],
    category: 'Full Stack',
    color: 'primary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 16,
  },
  {
    title: 'Project Management Tool',
    description: 'Comprehensive project tracking software with Gantt charts, time tracking, and reporting',
    image_url:
      'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
    category: 'Web Development',
    color: 'secondary',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 17,
  },
  {
    title: 'Learning Management System',
    description: 'Educational platform with courses, quizzes, certificates, and student progress tracking',
    image_url:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Celery'],
    category: 'Software',
    color: 'accent',
    github_url: '#',
    demo_url: '#',
    featured: false,
    sort_order: 18,
  },
];
