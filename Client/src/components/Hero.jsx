import { useState, useEffect, useRef } from 'react';
import { ZapIcon, WrenchIcon, LinkIcon, ReactIcon, NodeIcon } from './icons';
import './Hero.css';

const STATS = [
  { num: '2+',  label: 'Years Experience',  tip: 'Building real products since 2022' },
  { num: '30%', label: 'Dev Efficiency ↑',  tip: 'Faster delivery via reusable systems' },
  { num: '35%', label: 'Load Time ↓',       tip: 'Optimised bundles & lazy loading' },
  { num: '25%', label: 'API Speed ↑',       tip: 'Caching, indexing & query tuning' },
];

const ROLES = [
  { label: 'Full Stack Developer', Icon: ZapIcon,    color: 'green'  },
  { label: 'MERN Stack Engineer',  Icon: WrenchIcon, color: 'purple' },
  { label: 'Web3 Builder',         Icon: LinkIcon,   color: 'blue'   },
  { label: 'React.js Developer',   Icon: ReactIcon,  color: 'green'  },
  { label: 'Node.js Developer',    Icon: NodeIcon,   color: 'purple' },
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
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.5,
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
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero__canvas" />;
}

/* ── Typewriter with delete + retype ── */
function useRoleTyper(roles, typingSpeed = 70, deletingSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx]     = useState(0);
  const [phase, setPhase]         = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const role = roles[roleIdx].label;
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), deletingSpeed);
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx, roles, typingSpeed, deletingSpeed, pauseMs]);

  return { displayed, roleIdx, phase };
}

/* ── Static typewriter (name only, no delete) ── */
function useTypewriter(text, speed = 80, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
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

/* ── Terminal widget ── */
const TERMINAL_LINES = [
  { prefix: '$', text: 'git status',                       color: 'green'  },
  { prefix: '>', text: 'On branch main — 3 files changed', color: 'muted'  },
  { prefix: '$', text: 'npm run build',                    color: 'green'  },
  { prefix: '>', text: 'Build successful ✓ 1.2s',          color: 'accent' },
  { prefix: '$', text: 'git push origin main',             color: 'green'  },
  { prefix: '>', text: 'Deployed to production 🚀',        color: 'accent' },
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

/* ── Download icon ── */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const [tipIdx, setTipIdx]     = useState(null);
  const photoWrapRef            = useRef(null);

  const { displayed: typedFirst, done: firstDone } = useTypewriter('Ramesh',  90, 300);
  const { displayed: typedLast }                   = useTypewriter('Manohar', 90, firstDone ? 100 : 99999);

  /* Role typer with delete + retype */
  const { displayed: roleText, roleIdx, phase } = useRoleTyper(ROLES);
  const currentRole = ROLES[roleIdx];
  const RoleIcon    = currentRole.Icon;

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

  /* Magnetic button */
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
        <div className="hero__content">

          {/* ── Top row: photo + name ── */}
          <div className="hero__top-row">
            <div
              className="hero__photo-wrap"
              ref={photoWrapRef}
              onMouseMove={handlePhotoMove}
              onMouseLeave={handlePhotoLeave}
            >
              <div className="hero__photo-ring hero__photo-ring--outer" />
              <div className="hero__photo-ring hero__photo-ring--inner" />
              <div className="hero__photo-glow" />
              <img src="/avatar.jpeg" alt="Ramesh Manohar" className="hero__photo" />
              <span className="hero__badge-float hero__badge-float--1">React.js</span>
              <span className="hero__badge-float hero__badge-float--2">Node.js</span>
              <span className="hero__badge-float hero__badge-float--3">JavaScript</span>
            </div>

            <div className="hero__name-block">
              <div className="hero__badge">
                <span className="hero__badge-dot" />
                Available for full-time opportunities &amp; Collaborations
              </div>
              <h1 className="hero__name">
                <span>{typedFirst}</span>
                {!firstDone && <span className="hero__cursor">|</span>}
                {firstDone && (
                  <>{' '}<span className="hero__name-accent">{typedLast}</span><span className="hero__cursor">|</span></>
                )}
              </h1>
            </div>
          </div>

          {/* ── Role typer with delete + retype ── */}
          <div className="hero__roles">
            <div className={`hero__role-pill hero__role-pill--${currentRole.color}`}>
              <span className="hero__role-icon"><RoleIcon size={16} /></span>
              <span className="hero__role-label">
                {roleText}
                <span className={`hero__role-cursor ${phase === 'pausing' ? 'hero__role-cursor--blink' : ''}`}>|</span>
              </span>
            </div>

            <div className="hero__role-dots">
              {ROLES.map((r, i) => (
                <span
                  key={i}
                  className={`hero__role-dot hero__role-dot--${r.color} ${i === roleIdx ? 'hero__role-dot--active' : ''}`}
                  aria-hidden="true"
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

          {/* ── CTA with Resume Download ── */}
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
            <a
              href="/Ramesh_M_MERN_Stack_Dev_2YOE.pdf"
              download
              className="btn btn-resume"
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
              aria-label="Download Resume"
            >
              <DownloadIcon /> Resume
            </a>
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
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-mouse"><div className="hero__scroll-wheel" /></div>
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
