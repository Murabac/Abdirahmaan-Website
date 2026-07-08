import { useEffect, useState } from 'react';
import { Loader2, Mail, RefreshCw } from 'lucide-react';
import { fetchContactMessages } from '../lib/messages';
import type { ContactMessage } from '../types/database';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function DashboardMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchContactMessages()
      .then(setMessages)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-medium text-foreground sm:text-2xl">Contact messages</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Submissions from your portfolio contact form
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading && messages.length === 0 ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
          No messages yet. They will appear here when someone uses the contact form.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <article key={msg.id} className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg font-medium text-foreground">{msg.name}</h2>
                  <a
                    href={`mailto:${msg.email}`}
                    className="inline-flex items-center gap-1 break-all text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {msg.email}
                  </a>
                </div>
                <time className="text-sm text-muted-foreground">{formatDate(msg.created_at)}</time>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm text-foreground sm:text-base">{msg.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
