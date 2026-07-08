import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types/database';
import { getProjectButtonClass, getProjectGradientClass } from '../lib/projectStyles';

type ProjectCardProps = {
  project: Project;
  variant?: 'featured' | 'full';
};

export function ProjectCard({ project, variant = 'featured' }: ProjectCardProps) {
  const showCategory = variant === 'full';
  const demoHref = project.demo_url || '#';
  const githubHref = project.github_url || '#';

  return (
    <div className="group rounded-xl border border-border bg-white shadow-sm transition-all sm:transform sm:hover:-translate-y-2 sm:hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-gradient-to-t opacity-100 sm:gap-4 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 ${getProjectGradientClass(project.color)}`}
        >
          <a
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-3 text-foreground transition-transform hover:scale-110"
            title="View demo"
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-3 text-foreground transition-transform hover:scale-110"
            title="View code"
          >
            <Github size={20} />
          </a>
        </div>
        {showCategory && (
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs text-foreground backdrop-blur-sm sm:px-3 sm:py-1 sm:text-sm">
              {project.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="mb-2 text-lg text-foreground sm:mb-3 sm:text-xl">{project.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground sm:mb-4 sm:text-base">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-foreground">
              {tag}
            </span>
          ))}
        </div>

        {variant === 'full' ? (
          <div className="flex gap-2">
            <a
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 rounded-lg py-2 text-center text-white transition-colors ${getProjectButtonClass(project.color)}`}
            >
              View Demo
            </a>
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-foreground transition-colors hover:bg-gray-100"
            >
              <Github size={18} />
            </a>
          </div>
        ) : (
          <a
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full rounded-lg py-2 text-center text-white transition-colors ${getProjectButtonClass(project.color)}`}
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
}
