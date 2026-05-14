import { useState } from 'react';
import { ExternalLink, Filter, Github } from 'lucide-react';

interface AllProjectsProps {
  onBackHome?: () => void;
}

export function AllProjects({ onBackHome }: AllProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile Apps', 'Software', 'Full Stack'];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with cart management, payment integration, and admin dashboard",
      image: "https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY2NTIxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      color: "primary",
      github: "#",
      demo: "#"
    },
    {
      title: "Fitness Tracking App",
      description: "Cross-platform mobile app for tracking workouts, nutrition, and progress with real-time sync",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY2NDk4OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React Native", "Firebase", "Redux", "Expo"],
      category: "Mobile Apps",
      color: "secondary",
      github: "#",
      demo: "#"
    },
    {
      title: "Enterprise CRM System",
      description: "Custom CRM software with analytics, reporting, and automated workflows for business operations",
      image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NjY1MjQ1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["C#", ".NET", "SQL Server", "Azure"],
      category: "Software",
      color: "accent",
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team features, and analytics",
      image: "https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBsYXB0b3AlMjBzY3JlZW58ZW58MXx8fHwxNzY2NTEwNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind"],
      category: "Web Development",
      color: "primary",
      github: "#",
      demo: "#"
    },
    {
      title: "Social Media App",
      description: "Native mobile application with real-time messaging, feeds, and media sharing capabilities",
      image: "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3JraW5nJTIwbW9kZXJufGVufDF8fHx8MTc2NjUyMTAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Flutter", "Dart", "GraphQL", "AWS"],
      category: "Mobile Apps",
      color: "secondary",
      github: "#",
      demo: "#"
    },
    {
      title: "Inventory Management System",
      description: "Desktop software for warehouse management with barcode scanning and automated reporting",
      image: "https://images.unsplash.com/photo-1674483699209-25fb6d962119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY2NTIxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Python", "Django", "MySQL", "Docker"],
      category: "Software",
      color: "accent",
      github: "#",
      demo: "#"
    },
    {
      title: "Real Estate Platform",
      description: "Property listing website with advanced search, virtual tours, and mortgage calculator",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYXBwfGVufDF8fHx8MTc2NjUyNDU4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React", "Express", "PostgreSQL", "Google Maps"],
      category: "Web Development",
      color: "primary",
      github: "#",
      demo: "#"
    },
    {
      title: "Food Delivery App",
      description: "Complete food ordering system with restaurant management, delivery tracking, and payments",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBhcHB8ZW58MXx8fHwxNzY2NTI0NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      category: "Full Stack",
      color: "secondary",
      github: "#",
      demo: "#"
    },
    {
      title: "HR Management Software",
      description: "Enterprise HR solution with employee management, payroll, and performance tracking",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxocm0lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjY1MjQ1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Java", "Spring Boot", "MySQL", "Angular"],
      category: "Software",
      color: "accent",
      github: "#",
      demo: "#"
    },
    {
      title: "Weather Forecast App",
      description: "Beautiful weather app with 7-day forecasts, weather alerts, and location-based updates",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwYXBwfGVufDF8fHx8MTc2NjUyNDU5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Swift", "iOS", "CoreLocation", "WeatherAPI"],
      category: "Mobile Apps",
      color: "primary",
      github: "#",
      demo: "#"
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with markdown editor, SEO optimization, and analytics dashboard",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwd3JpdGluZ3xlbnwxfHx8fDE3NjY1MjQ1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Next.js", "MDX", "Prisma", "Vercel"],
      category: "Web Development",
      color: "secondary",
      github: "#",
      demo: "#"
    },
    {
      title: "Expense Tracker",
      description: "Personal finance app with budget planning, expense categorization, and spending insights",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYXBwfGVufDF8fHx8MTc2NjUyNDU5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Kotlin", "Android", "Room DB", "MPAndroidChart"],
      category: "Mobile Apps",
      color: "accent",
      github: "#",
      demo: "#"
    },
    {
      title: "Video Streaming Platform",
      description: "Netflix-style streaming service with video player, subscriptions, and content management",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHN0cmVhbWluZ3xlbnwxfHx8fDE3NjY1MjQ1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React", "Node.js", "AWS S3", "HLS"],
      category: "Full Stack",
      color: "primary",
      github: "#",
      demo: "#"
    },
    {
      title: "Project Management Tool",
      description: "Comprehensive project tracking software with Gantt charts, time tracking, and reporting",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NjY1MjQ1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Vue.js", "Laravel", "MySQL", "Redis"],
      category: "Web Development",
      color: "secondary",
      github: "#",
      demo: "#"
    },
    {
      title: "Learning Management System",
      description: "Educational platform with courses, quizzes, certificates, and student progress tracking",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NjY1MjQ1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Python", "FastAPI", "PostgreSQL", "Celery"],
      category: "Software",
      color: "accent",
      github: "#",
      demo: "#"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'from-primary/20 to-primary/5',
      secondary: 'from-secondary/20 to-secondary/5',
      accent: 'from-accent/20 to-accent/5'
    };
    return colors[color] || 'from-primary/20 to-primary/5';
  };

  const getButtonColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary hover:bg-primary/90',
      secondary: 'bg-secondary hover:bg-secondary/90',
      accent: 'bg-accent hover:bg-accent/90'
    };
    return colors[color] || 'bg-primary hover:bg-primary/90';
  };

  return (
    <section id="all-projects" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl mb-4 text-foreground">All Projects</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore my complete portfolio of web applications, mobile apps, and software solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <Filter className="mr-2 text-primary" size={24} />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg'
                  : 'bg-white text-foreground hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing <span className="text-primary">{filteredProjects.length}</span> projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${getColorClass(project.color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4`}>
                  <a 
                    href={project.demo}
                    className="bg-white text-foreground p-3 rounded-full hover:scale-110 transition-transform"
                    title="View Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a 
                    href={project.github}
                    className="bg-white text-foreground p-3 rounded-full hover:scale-110 transition-transform"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={project.demo}
                    className={`flex-1 ${getButtonColor(project.color)} text-white py-2 rounded-lg transition-colors text-center`}
                  >
                    View Demo
                  </a>
                  <a
                    href={project.github}
                    className="px-4 py-2 border-2 border-gray-300 text-foreground rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onBackHome?.()}
            className="inline-block transform rounded-lg border-2 border-primary bg-white px-8 py-3 text-foreground transition-all hover:scale-105 hover:bg-primary hover:text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
