import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LOGO_SRC = '/logo.png';

interface NavigationProps {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <img src={LOGO_SRC} alt="Mire — brand logo" className="h-10 w-auto object-contain" />
          </div>

          <div className="hidden md:flex md:space-x-8">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-foreground transition-colors hover:text-primary"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-foreground transition-colors hover:text-primary"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className="text-foreground transition-colors hover:text-primary"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="text-foreground transition-colors hover:text-primary"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="rounded-lg bg-primary px-6 py-2 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact
            </button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="block w-full rounded-md px-3 py-2 text-left text-foreground transition-colors hover:bg-secondary/10 hover:text-primary"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="block w-full rounded-md px-3 py-2 text-left text-foreground transition-colors hover:bg-secondary/10 hover:text-primary"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className="block w-full rounded-md px-3 py-2 text-left text-foreground transition-colors hover:bg-secondary/10 hover:text-primary"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="block w-full rounded-md px-3 py-2 text-left text-foreground transition-colors hover:bg-secondary/10 hover:text-primary"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="mt-2 block w-full rounded-md bg-primary px-3 py-2 text-left text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
