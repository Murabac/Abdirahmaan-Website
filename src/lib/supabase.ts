import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** Postgres schema where tables are stored. */
export const SUPABASE_SCHEMA = 'abdirahmaan';

/**
 * Schema used by PostgREST / supabase-js for contact_messages.
 * Uses public API views (migration 008) so "Exposed schemas" does not need abdirahmaan.
 */
export const SUPABASE_API_SCHEMA = 'public' as const;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    );
  }

  if (!client) {
    client = createClient(supabaseUrl!, supabaseAnonKey!, {
      db: { schema: SUPABASE_API_SCHEMA },
    });
  }

  return client;
}

export function formatSupabaseError(message: string): string {
  if (message.includes('Invalid schema') && message.includes('abdirahmaan')) {
    return (
      'Run supabase/migrations/008_public_rest_api_views.sql in the SQL Editor, then redeploy. ' +
      'Or add abdirahmaan under Project Settings → Data API → Exposed schemas.'
    );
  }
  return message;
}
