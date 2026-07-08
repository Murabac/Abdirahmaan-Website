import { SEED_PROJECTS } from '../data/projectsSeed';
import { formatSupabaseError, getSupabase, isSupabaseConfigured } from './supabase';
import type { Project, ProjectInput } from '../types/database';

const PROJECT_COLUMNS =
  'id, title, description, image_url, tags, category, color, github_url, demo_url, featured, sort_order, created_at, updated_at';

function withFallbackId(project: ProjectInput, index: number): Project {
  const now = new Date().toISOString();
  return {
    id: `seed-${index}`,
    ...project,
    created_at: now,
    updated_at: now,
  };
}

export function getSeedProjects(options?: { featured?: boolean }): Project[] {
  let list = SEED_PROJECTS.map(withFallbackId);
  if (options?.featured === true) {
    list = list.filter((p) => p.featured);
  }
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchProjects(options?: { featured?: boolean }): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    return getSeedProjects(options);
  }

  const supabase = getSupabase();
  let query = supabase.from('projects').select(PROJECT_COLUMNS).order('sort_order', { ascending: true });

  if (options?.featured === true) {
    query = query.eq('featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.warn('fetchProjects:', error.message);
    return getSeedProjects(options);
  }

  if (!data?.length) {
    return getSeedProjects(options);
  }

  return data as Project[];
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    return getSeedProjects().find((p) => p.id === id) ?? null;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.from('projects').select(PROJECT_COLUMNS).eq('id', id).maybeSingle();

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return (data as Project | null) ?? null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('projects').insert(input).select(PROJECT_COLUMNS).single();

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return data as Project;
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<Project> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('projects').update(input).eq('id', id).select(PROJECT_COLUMNS).single();

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }
}
