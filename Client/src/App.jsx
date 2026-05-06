import { useState, useEffect } from 'react';
import './styles/global.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* Wave SVG helper — reusable inline component */
function Wave({ to, flip }) {
  return (
    <div className={`wave-divider${flip ? ' wave-divider--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  /* ── Cursor spotlight ── */
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      <div className="cursor-spotlight" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        {/* hero(bg) → skills(surface) */}
        <Wave to="var(--surface)" />
        <Skills />
        {/* skills(surface) → experience(bg) */}
        <Wave to="var(--bg)" flip />
        <Experience />
        {/* experience(bg) → projects(bg) — same colour, skip wave */}
        <Projects />
        {/* projects(bg) → education(bg) — same colour, skip wave */}
        <Education />
        {/* education(bg) → contact(surface) */}
        <Wave to="var(--surface)" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
