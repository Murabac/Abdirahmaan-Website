import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, MessageSquare } from 'lucide-react';
import { fetchContactMessages } from '../lib/messages';

export function DashboardOverviewPage() {
  const [messageCount, setMessageCount] = useState<number | null>(null);
  const [latestName, setLatestName] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContactMessages()
      .then((rows) => {
        setMessageCount(rows.length);
        setLatestName(rows[0]?.name ?? null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      });
  }, []);

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-foreground sm:text-2xl">Overview</h1>
      <p className="mb-8 text-muted-foreground">Welcome to your portfolio admin area.</p>

      {error && (
        <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Inbox className="h-6 w-6" />
          </div>
          <p className="text-3xl font-medium text-foreground">{messageCount ?? '—'}</p>
          <p className="text-muted-foreground">Total contact messages</p>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <MessageSquare className="h-6 w-6" />
          </div>
          <p className="text-lg font-medium text-foreground">{latestName ?? 'No messages yet'}</p>
          <p className="text-muted-foreground">Latest sender</p>
        </div>
      </div>

      <Link
        to="/dashboard/messages"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90 sm:mt-8 sm:w-auto"
      >
        <MessageSquare className="h-5 w-5" />
        View all messages
      </Link>
    </div>
  );
}
