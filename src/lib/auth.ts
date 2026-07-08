import { getSupabase, isSupabaseConfigured } from './supabase';

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  if (!isSupabaseConfigured) {
    return;
  }

  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getSession() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}
