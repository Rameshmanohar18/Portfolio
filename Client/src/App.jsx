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

const NAV_SECTIONS = [
  { id: 'home',       label: 'Home'       },
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'education',  label: 'Education'  },
  { id: 'contact',    label: 'Contact'    },
];

/* ── Section progress dot-nav ── */
function SectionNav({ activeId }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <nav className="section-nav" aria-label="Section navigation">
      {NAV_SECTIONS.map(s => (
        <button
          key={s.id}
          className={`section-nav__dot ${activeId === s.id ? 'section-nav__dot--active' : ''}`}
          onClick={() => scrollTo(s.id)}
          aria-label={`Go to ${s.label}`}
          title={s.label}
        >
          <span className="section-nav__tooltip">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
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
  const [theme, setTheme]               = useState(() => localStorage.getItem('theme') || 'dark');
  const [scrollPct, setScrollPct]       = useState(0);
  const [loaderDone, setLoaderDone]     = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [activeId, setActiveId]         = useState('home');

  /* ── Loader ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderDone(true),   2200);
    const t2 = setTimeout(() => setLoaderHidden(true), 2900);
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

  /* ── Active section tracker ── */
  useEffect(() => {
    const ids = NAV_SECTIONS.map(s => s.id);
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
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
      {!loaderHidden && <PageLoader done={loaderDone} />}

      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <div className="cursor-spotlight" />
      <SectionNav activeId={activeId} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Wave to="var(--surface)" />
        <Skills />
        <Wave to="var(--bg)" flip />
        <Experience />
        <Projects />
        <Education />
        <Wave to="var(--surface)" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
