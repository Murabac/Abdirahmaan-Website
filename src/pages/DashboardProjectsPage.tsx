import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { deleteProject, fetchProjects } from '../lib/projects';
import type { Project } from '../types/database';

export function DashboardProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    if (project.id.startsWith('seed-')) {
      setError('Cannot delete seed fallback data. Run migration 012 in Supabase first.');
      return;
    }

    setDeletingId(project.id);
    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-medium text-foreground sm:text-2xl">Projects</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage portfolio projects shown on the public site
          </p>
        </div>
        <Link
          to="/dashboard/projects/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          Add project
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white py-12 text-center sm:py-16">
          <p className="mb-4 text-muted-foreground">No projects yet.</p>
          <Link to="/dashboard/projects/new" className="text-primary hover:underline">
            Create your first project
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 lg:hidden">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-border bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={project.image_url}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-medium text-foreground">{project.title}</h2>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not featured</span>
                      )}
                      <span className="text-muted-foreground">Order: {project.sort_order}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/dashboard/projects/${project.id}/edit`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    disabled={deletingId === project.id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-destructive/30 py-2 text-sm text-destructive disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-xl border border-border bg-white shadow-sm lg:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border bg-gray-50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image_url}
                          alt=""
                          className="h-10 w-16 rounded object-cover"
                        />
                        <span className="font-medium text-foreground">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{project.category}</td>
                    <td className="px-4 py-3">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{project.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/dashboard/projects/${project.id}/edit`}
                          className="rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-gray-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(project)}
                          disabled={deletingId === project.id}
                          className="rounded-lg border border-border p-2 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
