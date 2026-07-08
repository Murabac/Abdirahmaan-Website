import { useEffect, useState } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../data/projectsSeed';
import { ProjectCard } from './ProjectCard';
import { fetchProjects } from '../lib/projects';
import type { Project } from '../types/database';

interface AllProjectsProps {
  onBackHome?: () => void;
}

export function AllProjects({ onBackHome }: AllProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="all-projects"
      className="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 md:pb-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 text-3xl text-foreground sm:text-4xl md:text-6xl">All Projects</h1>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore my complete portfolio of web applications, mobile apps, and software solutions
          </p>
        </div>

        <div className="-mx-4 mb-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-12 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-3">
            <Filter className="hidden shrink-0 text-primary sm:mr-2 sm:block" size={24} />
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all sm:px-6 sm:text-base ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg'
                    : 'bg-white text-foreground hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Showing <span className="text-primary">{filteredProjects.length}</span> projects
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="full" />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onBackHome?.()}
            className="inline-block w-full rounded-lg border-2 border-primary bg-white px-8 py-3.5 text-foreground transition-all hover:bg-primary hover:text-white sm:w-auto sm:hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
