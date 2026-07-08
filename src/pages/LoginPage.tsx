import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

const LOGO_SRC = '/logo.png';

export function LoginPage() {
  const { session, signIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && session) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Check your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-5 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <img src={LOGO_SRC} alt="Mire logo" className="mx-auto mb-4 h-14 object-contain" />
          <h1 className="text-2xl text-foreground">Admin login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage portfolio messages</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase environment variables are missing. Add them to <code>.env</code> and restart the dev server.
          </p>
        )}

        {error && (
          <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={submitting || !isSupabaseConfigured}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
              placeholder="admin@abdirahmaan.dev"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={submitting || !isSupabaseConfigured}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !isSupabaseConfigured}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Sign in
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
