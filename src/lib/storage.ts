import { formatSupabaseError, getSupabase } from './supabase';

export const PROJECT_IMAGES_BUCKET = 'project-images';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export function validateProjectImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please choose a JPEG, PNG, WebP, or GIF image.';
  }
  if (file.size > MAX_BYTES) {
    return 'Image must be 5 MB or smaller.';
  }
  return null;
}

export async function uploadProjectImage(file: File): Promise<string> {
  const validationError = validateProjectImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const supabase = getSupabase();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(PROJECT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
