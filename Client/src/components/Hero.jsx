import { useState, useEffect } from 'react';
import './Hero.css';

const STATS = [
  { num: '2+',  label: 'Years Experience' },
  { num: '30%', label: 'Dev Efficiency ↑' },
  { num: '35%', label: 'Load Time ↓' },
  { num: '25%', label: 'API Speed ↑' },
];

const ROLES = ['Full Stack Developer', 'MERN Stack Engineer', 'Web3 Builder', 'Reactjs Developer', 'Nodejs Developer'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
      <div className="hero__grid" />
      <div className="hero__particles">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`hero__particle hero__particle--${i + 1}`} />
        ))}
      </div>

      <div className="hero__inner container">

        {/* ── Left: text content ── */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Available for opportunities & Collaborations
          </div>

          <h1 className="hero__name">
            Ramesh<br />
            <span className="hero__name-accent">Manohar</span>
          </h1>

          <p className="hero__role">
            <span className="hero__role-prefix">// </span>
            <span className={`hero__role-text ${fade ? 'hero__role-text--in' : 'hero__role-text--out'}`}>
              {ROLES[roleIdx]}
            </span>
          </p>

          <p className="hero__desc">
            Result-driven developer with 2+ years building scalable, high-performance
            web applications. Specialized in MERN stack, real-time systems, and
            blockchain integrations.
          </p>

          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>

          <div className="hero__stats">
            {STATS.map((s) => (
              <div className="hero__stat" key={s.label}>
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: avatar ── */}
        <div className="hero__photo-wrap">
          <div className="hero__photo-ring hero__photo-ring--outer" />
          <div className="hero__photo-ring hero__photo-ring--inner" />
          <div className="hero__photo-glow" />
          <img
            src="/avatar.jpeg"
            alt="Ramesh Manohar"
            className="hero__photo"
          />
          {/* Floating tech badges */}
          <span className="hero__badge-float hero__badge-float--1">React.js</span>
          <span className="hero__badge-float hero__badge-float--2">Node.js</span>
          <span className="hero__badge-float hero__badge-float--3">Web3</span>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
