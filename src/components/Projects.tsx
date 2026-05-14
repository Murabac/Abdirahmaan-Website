import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  onViewAll?: () => void;
}

export function Projects({ onViewAll }: ProjectsProps) {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with cart management, payment integration, and admin dashboard',
      image:
        'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: 'primary',
    },
    {
      title: 'Fitness Tracking App',
      description:
        'Cross-platform mobile app for tracking workouts, nutrition, and progress with real-time sync',
      image:
        'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
      color: 'secondary',
    },
    {
      title: 'Enterprise CRM System',
      description:
        'Custom CRM software with analytics, reporting, and automated workflows for business operations',
      image:
        'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['C#', '.NET', 'SQL Server', 'Azure'],
      color: 'accent',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team features, and analytics',
      image:
        'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind'],
      color: 'primary',
    },
    {
      title: 'Social Media App',
      description: 'Native mobile application with real-time messaging, feeds, and media sharing capabilities',
      image:
        'https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['Flutter', 'Dart', 'GraphQL', 'AWS'],
      color: 'secondary',
    },
    {
      title: 'Inventory Management System',
      description: 'Desktop software for warehouse management with barcode scanning and automated reporting',
      image:
        'https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['Python', 'Django', 'MySQL', 'Docker'],
      color: 'accent',
    },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'from-primary/20 to-primary/5',
      secondary: 'from-secondary/20 to-secondary/5',
      accent: 'from-accent/20 to-accent/5',
    };
    return colors[color] || 'from-primary/20 to-primary/5';
  };

  const getButtonColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary hover:bg-primary/90',
      secondary: 'bg-secondary hover:bg-secondary/90',
      accent: 'bg-accent hover:bg-accent/90',
    };
    return colors[color] || 'bg-primary hover:bg-primary/90';
  };

  return (
    <section id="projects" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-foreground md:text-5xl">Featured Projects</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A selection of recent projects showcasing my expertise in web development
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group transform rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${getColorClass(project.color)}`}
                >
                  <button
                    type="button"
                    className="rounded-full bg-white p-3 text-foreground transition-transform hover:scale-110"
                    aria-label="Open demo"
                  >
                    <ExternalLink size={20} />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-white p-3 text-foreground transition-transform hover:scale-110"
                    aria-label="View repository"
                  >
                    <Github size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl text-foreground">{project.title}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="rounded-full bg-gray-100 px-3 py-1 text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className={`w-full rounded-lg py-2 text-white transition-colors ${getButtonColor(project.color)}`}
                >
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="transform rounded-lg bg-gradient-to-r from-primary via-secondary to-accent px-8 py-3 text-white transition-all hover:scale-105 hover:opacity-90"
            onClick={onViewAll}
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
