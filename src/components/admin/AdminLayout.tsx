import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LOGO_SRC = '/logo.png';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare, end: false },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban, end: false },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string, end: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-border p-4 lg:p-6">
        <img src={LOGO_SRC} alt="Mire logo" className="h-9 w-auto object-contain sm:h-10" />
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-2 text-foreground hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 sm:p-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive(to, end)
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-border p-3 sm:p-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View portfolio
        </a>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-dvh bg-gray-100">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close menu overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,16rem)] flex-col border-r border-border bg-white shadow-xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-foreground hover:bg-gray-100"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="truncate text-sm font-medium text-foreground">Admin</span>
          <img src={LOGO_SRC} alt="" className="h-8 w-auto object-contain" aria-hidden />
        </header>

        <header className="hidden border-b border-border bg-white px-4 py-4 sm:px-6 lg:block">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="truncate font-medium text-foreground">{user?.email}</p>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          <p className="mb-4 truncate text-xs text-muted-foreground lg:hidden">{user?.email}</p>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
