import { formatSupabaseError, getSupabase, isSupabaseConfigured } from './supabase';
import type { ContactMessage } from '../types/database';

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return (data ?? []) as ContactMessage[];
}
