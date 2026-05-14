import { ArrowDown } from 'lucide-react';
import { ParticlesBackground } from './ParticlesBackground';

const LOGO_SRC = '/logo.png';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 px-4 pt-16"
    >
      <ParticlesBackground />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="mb-8 flex justify-center">
          <img
            src={LOGO_SRC}
            alt="Mire — brand logo"
            className="h-24 max-w-[min(100%,280px)] animate-float object-contain md:h-36"
          />
        </div>

        <h1 className="mb-6 text-4xl text-foreground md:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-primary">Abdirahman Mire</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Crafting beautiful web applications, powerful software solutions, and seamless mobile
          experiences with modern technologies
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="transform rounded-lg bg-primary px-8 py-3 text-primary-foreground transition-all hover:scale-105 hover:opacity-90"
          >
            View My Work
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="transform rounded-lg bg-secondary px-8 py-3 text-secondary-foreground transition-all hover:scale-105 hover:opacity-90"
          >
            Get In Touch
          </button>
        </div>

        <div className="mt-16 animate-bounce">
          <button
            type="button"
            onClick={scrollToAbout}
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to about"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
