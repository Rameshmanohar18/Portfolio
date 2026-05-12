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

/* ── Page Loader ── */
function PageLoader({ done }) {
  return (
    <div className={`page-loader ${done ? 'page-loader--done' : ''}`} aria-hidden="true">
      <div className="page-loader__inner">
        <div className="page-loader__logo">
          Ramesh<span className="page-loader__dot">.</span>dev
        </div>
        <div className="page-loader__bar-wrap">
          <div className="page-loader__bar" />
        </div>
        <p className="page-loader__label">Loading portfolio…</p>
      </div>
    </div>
  );
}

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
  const [theme, setTheme]         = useState(() => localStorage.getItem('theme') || 'dark');
  const [scrollPct, setScrollPct] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);

  /* ── Loader: hide after 2.2s ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderDone(true),   2200);
    const t2 = setTimeout(() => setLoaderHidden(true), 2900); // after fade-out
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {/* Page loader — unmounted from DOM after fade completes */}
      {!loaderHidden && <PageLoader done={loaderDone} />}

      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
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
