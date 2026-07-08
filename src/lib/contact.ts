import { formatSupabaseError, getSupabase, isSupabaseConfigured } from './supabase';

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export async function submitContactMessage(input: ContactMessageInput): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Contact form is not connected yet. Please try again later or email directly.');
  }

  const supabase = getSupabase();

  const { error } = await supabase.from('contact_messages').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  });

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }
}
