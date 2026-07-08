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
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 px-4 pb-8 pt-20 sm:px-6 sm:pt-24"
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

        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-secondary md:text-base">
          Senior software developer & project manager
        </p>

        <h1 className="mb-6 text-balance text-3xl leading-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-primary">Mohamed</span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl">
          I build custom business systems, broadcast automation, and scalable technical solutions — from .NET and APIs
          to full delivery leadership. I've led international remote teams and shipped high-impact work across
          e-commerce, construction, logistics, media, healthcare, and NGOs.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full transform rounded-lg bg-primary px-8 py-3.5 text-primary-foreground transition-all hover:opacity-90 sm:w-auto sm:hover:scale-105"
          >
            View My Work
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full transform rounded-lg bg-secondary px-8 py-3.5 text-secondary-foreground transition-all hover:opacity-90 sm:w-auto sm:hover:scale-105"
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
