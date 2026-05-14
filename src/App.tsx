import { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { AllProjects } from './components/AllProjects';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'all-projects'>('home');

  if (currentPage === 'all-projects') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={() => setCurrentPage('home')} />
        <AllProjects onBackHome={() => setCurrentPage('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={() => setCurrentPage('home')} />
      <Hero />
      <About />
      <Skills />
      <Projects onViewAll={() => setCurrentPage('all-projects')} />
      <Contact />
    </div>
  );
}
