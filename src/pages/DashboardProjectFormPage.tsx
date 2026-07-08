import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Loader2, Save } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECT_COLORS } from '../data/projectsSeed';
import { createProject, fetchProjectById, updateProject } from '../lib/projects';
import { uploadProjectImage, validateProjectImageFile } from '../lib/storage';
import type { ProjectInput } from '../types/database';

const emptyForm: ProjectInput = {
  title: '',
  description: '',
  image_url: '',
  tags: [],
  category: 'Web Development',
  color: 'primary',
  github_url: '#',
  demo_url: '#',
  featured: false,
  sort_order: 0,
};

export function DashboardProjectFormPage() {
  const { id } = useParams();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [tagsText, setTagsText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (isNew) return;

    setLoading(true);
    fetchProjectById(id!)
      .then((project) => {
        if (!project) {
          setError('Project not found');
          return;
        }
        setForm({
          title: project.title,
          description: project.description,
          image_url: project.image_url,
          tags: project.tags,
          category: project.category,
          color: project.color,
          github_url: project.github_url,
          demo_url: project.demo_url,
          featured: project.featured,
          sort_order: project.sort_order,
        });
        setTagsText(project.tags.join(', '));
        setPreviewUrl(project.image_url);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load project'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateProjectImageFile(file);
    if (validationError) {
      setError(validationError);
      e.target.value = '';
      return;
    }

    setError('');
    setImageFile(file);
    if (previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let imageUrl = form.image_url.trim();

      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadProjectImage(imageFile);
        setUploadingImage(false);
      }

      if (!imageUrl) {
        throw new Error('Add a project image by uploading a file or pasting an image URL.');
      }

      const payload: ProjectInput = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        image_url: imageUrl,
        tags: tagsText
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        github_url: form.github_url.trim() || '#',
        demo_url: form.demo_url.trim() || '#',
      };

      if (isNew) {
        await createProject(payload);
      } else {
        await updateProject(id!, payload);
      }
      navigate('/dashboard/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const displayPreview = previewUrl || form.image_url;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        to="/dashboard/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <h1 className="mb-2 text-xl font-medium text-foreground sm:text-2xl">
        {isNew ? 'Add project' : 'Edit project'}
      </h1>
      <p className="mb-8 text-muted-foreground">Changes appear on the public portfolio after saving.</p>

      {error && (
        <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div>
          <label className="mb-2 block text-sm text-foreground">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-foreground">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-foreground">Project image</label>
          <div className="space-y-4 rounded-lg border border-dashed border-border bg-gray-50/80 p-4">
            {displayPreview ? (
              <img
                src={displayPreview}
                alt="Project preview"
                className="mx-auto max-h-48 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <ImagePlus className="mb-2 h-10 w-10 opacity-50" />
                <p className="text-sm">No image selected</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              {imageFile ? 'Choose a different image' : 'Upload image'}
            </button>

            <p className="text-center text-xs text-muted-foreground">JPEG, PNG, WebP, or GIF — max 5 MB</p>

            <div>
              <label className="mb-2 block text-xs text-muted-foreground">Or paste image URL</label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => {
                  setForm({ ...form, image_url: e.target.value });
                  if (!imageFile) {
                    setPreviewUrl(e.target.value);
                  }
                }}
                placeholder="https://..."
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-foreground">Tags (comma-separated)</label>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="React, TypeScript, Node.js"
            className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-foreground">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {PROJECT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-foreground">Accent color</label>
            <select
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value as ProjectInput['color'] })}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {PROJECT_COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-foreground">Demo URL</label>
            <input
              value={form.demo_url}
              onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-foreground">GitHub URL</label>
            <input
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-foreground">Sort order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 pb-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Show on homepage (featured)</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {uploadingImage ? 'Uploading image...' : 'Saving...'}
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save project
            </>
          )}
        </button>
      </form>
    </div>
  );
}
