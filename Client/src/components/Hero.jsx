import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const STATS = [
  { num: '2+',  label: 'Years Experience',  tip: 'Building real products since 2022' },
  { num: '30%', label: 'Dev Efficiency ↑',  tip: 'Faster delivery via reusable systems' },
  { num: '35%', label: 'Load Time ↓',       tip: 'Optimised bundles & lazy loading' },
  { num: '25%', label: 'API Speed ↑',       tip: 'Caching, indexing & query tuning' },
];

const ROLES = [
  { label: 'Full Stack Developer', icon: '⚡', color: 'green'  },
  { label: 'MERN Stack Engineer',  icon: '🛠️', color: 'purple' },
  { label: 'Web3 Builder',         icon: '🔗', color: 'blue'   },
  { label: 'React.js Developer',   icon: '⚛️', color: 'green'  },
  { label: 'Node.js Developer',    icon: '🟢', color: 'purple' },
];

/* ── Animated node-graph canvas ── */
function NodeCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 28;
    const nodes = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,229,160,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,160,0.35)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="hero__canvas" />;
}

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 80, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(delay);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ── Terminal coding widget ── */
const TERMINAL_LINES = [
  { prefix: '$', text: 'git status',                      color: 'green'  },
  { prefix: '>', text: 'On branch main — 3 files changed', color: 'muted'  },
  { prefix: '$', text: 'npm run build',                   color: 'green'  },
  { prefix: '>', text: 'Build successful ✓ 1.2s',         color: 'accent' },
  { prefix: '$', text: 'git push origin main',            color: 'green'  },
  { prefix: '>', text: 'Deployed to production 🚀',       color: 'accent' },
];

function TerminalWidget() {
  const [lineIdx, setLineIdx] = useState(0);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) {
      const reset = setTimeout(() => { setLineIdx(0); setVisible([]); }, 3000);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => {
      setVisible(v => [...v, TERMINAL_LINES[lineIdx]]);
      setLineIdx(i => i + 1);
    }, lineIdx === 0 ? 800 : 900);
    return () => clearTimeout(t);
  }, [lineIdx]);

  return (
    <div className="terminal-widget">
      <div className="terminal-widget__bar">
        <span className="terminal-widget__dot terminal-widget__dot--red" />
        <span className="terminal-widget__dot terminal-widget__dot--yellow" />
        <span className="terminal-widget__dot terminal-widget__dot--green" />
        <span className="terminal-widget__title">ramesh@portfolio ~ </span>
      </div>
      <div className="terminal-widget__body">
        {visible.map((line, i) => (
          <div key={i} className={`terminal-widget__line terminal-widget__line--${line.color}`}>
            <span className="terminal-widget__prefix">{line.prefix}</span>
            <span>{line.text}</span>
          </div>
        ))}
        <span className="terminal-widget__cursor">▋</span>
      </div>
    </div>
  );
}

/* ── Main Hero component ── */
export default function Hero() {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [fade, setFade]         = useState(true);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]     = useState(false);
  const [tipIdx, setTipIdx]     = useState(null);
  const pausedRef               = useRef(false);
  const photoWrapRef            = useRef(null);

  const INTERVAL = 3000;

  const { displayed: typedFirst, done: firstDone } = useTypewriter('Ramesh',   90, 300);
  const { displayed: typedLast }                   = useTypewriter('Manohar',  90, firstDone ? 100 : 99999);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    setProgress(0);
    const tick = 30;
    const step = (tick / INTERVAL) * 100;
    const prog = setInterval(() => {
      if (!pausedRef.current) setProgress(p => Math.min(p + step, 100));
    }, tick);
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setFade(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setProgress(0);
        setFade(true);
      }, 350);
    }, INTERVAL);
    return () => { clearInterval(id); clearInterval(prog); };
  }, [roleIdx]);

  /* 3-D parallax on photo */
  const handlePhotoMove = (e) => {
    const wrap = photoWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 22;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -22;
    wrap.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.04)`;
  };
  const handlePhotoLeave = () => {
    if (photoWrapRef.current) photoWrapRef.current.style.transform = '';
  };

  /* Magnetic button effect */
  const handleMagnet = (e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width  / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) scale(1.04)`;
  };
  const handleMagnetLeave = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
      <div className="hero__grid" />
      <NodeCanvas />
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
            Available for opportunities &amp; Collaborations
          </div>

          {/* Typewriter name */}
          <h1 className="hero__name">
            <span>{typedFirst}</span>
            {!firstDone && <span className="hero__cursor">|</span>}
            {firstDone && (
              <>
                <br />
                <span className="hero__name-accent">{typedLast}</span>
                <span className="hero__cursor">|</span>
              </>
            )}
          </h1>

          {/* ── Role switcher ── */}
          <div className="hero__roles">
            <div
              className={`hero__role-pill hero__role-pill--${ROLES[roleIdx].color} ${fade ? 'hero__role-pill--in' : 'hero__role-pill--out'} ${paused ? 'hero__role-pill--paused' : ''}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="hero__role-icon">{ROLES[roleIdx].icon}</span>
              <span className="hero__role-label">{ROLES[roleIdx].label}</span>
              {paused && <span className="hero__role-pause-hint">⏸ hover to pause</span>}
              <span className="hero__role-bar">
                <span className="hero__role-bar-fill" style={{ width: `${progress}%` }} />
              </span>
            </div>

            <div className="hero__role-dots">
              {ROLES.map((r, i) => (
                <button
                  key={i}
                  className={`hero__role-dot hero__role-dot--${r.color} ${i === roleIdx ? 'hero__role-dot--active' : ''}`}
                  onClick={() => {
                    setFade(false);
                    setTimeout(() => { setRoleIdx(i); setProgress(0); setFade(true); }, 350);
                  }}
                  aria-label={r.label}
                  title={r.label}
                />
              ))}
            </div>
          </div>

          <p className="hero__desc">
            Full Stack Developer with 2+ years building production-grade MERN stack
            applications — cutting load times by 35%, boosting API performance by 25%,
            and shipping features that scale. I turn complex requirements into clean,
            maintainable code and thrive in fast-moving teams where ownership and
            impact matter.
          </p>

          <div className="hero__cta">
            <a
              href="#projects"
              className="btn btn-primary"
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
            >View Projects →</a>
            <a
              href="#contact"
              className="btn btn-outline"
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
            >Get In Touch</a>
          </div>

          <div className="hero__stats">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`hero__stat ${tipIdx === i ? 'hero__stat--hovered' : ''}`}
                onMouseEnter={() => setTipIdx(i)}
                onMouseLeave={() => setTipIdx(null)}
              >
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className={`hero__stat-tip ${tipIdx === i ? 'hero__stat-tip--visible' : ''}`}>
                  {s.tip}
                </div>
              </div>
            ))}
          </div>

          <TerminalWidget />
        </div>

        {/* ── Right: avatar ── */}
        <div
          className="hero__photo-wrap"
          ref={photoWrapRef}
          onMouseMove={handlePhotoMove}
          onMouseLeave={handlePhotoLeave}
        >
          <div className="hero__photo-ring hero__photo-ring--outer" />
          <div className="hero__photo-ring hero__photo-ring--inner" />
          <div className="hero__photo-glow" />
          <img
            src="/avatar.jpeg"
            alt="Ramesh Manohar"
            className="hero__photo"
          />
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
