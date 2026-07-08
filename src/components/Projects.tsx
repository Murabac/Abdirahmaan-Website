import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { fetchProjects } from '../lib/projects';
import type { Project } from '../types/database';

interface ProjectsProps {
  onViewAll?: () => void;
}

export function Projects({ onViewAll }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects({ featured: true })
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl text-foreground sm:text-3xl md:text-5xl">Featured Projects</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Selected work — including highlights from my CV alongside additional case-style examples.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="featured" />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            type="button"
            className="w-full rounded-lg bg-gradient-to-r from-primary via-secondary to-accent px-8 py-3.5 text-white transition-all hover:opacity-90 sm:w-auto sm:hover:scale-105"
            onClick={onViewAll}
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
