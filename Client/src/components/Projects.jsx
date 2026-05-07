import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './Projects.css';

const PROJECTS = [
  {
    icon: '🎰',
    name: 'House of Plinko',
    accent: 'green',
    methodology: 'Scrum · Agile',
    featured: true,
    liveUrl: null,
    githubUrl: null,
    stats: [
      { label: 'Real-time', value: 'Socket.io' },
      { label: 'Chains', value: '3 (ETH/BNB/MATIC)' },
      { label: 'Type', value: 'Crypto Gaming' },
    ],
    description:
      'A real-time crypto gaming platform where users deposit cryptocurrencies and play Plinko to earn rewards, withdrawable directly to their wallet. Game state is powered by Socket.io for instant low-latency updates. Supports multi-chain deposits and withdrawals. An admin panel manages betting plans, fee percentages, and platform configurations.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Solidity', 'Socket.io', 'ETH', 'BNB', 'MATIC'],
  },
  {
    icon: '🖼️',
    name: 'WOR-NFT Marketplace',
    accent: 'purple',
    methodology: null,
    featured: false,
    liveUrl: null,
    githubUrl: null,
    stats: [
      { label: 'Auth', value: 'MetaMask' },
      { label: 'Stack', value: 'MERN + Web3' },
      { label: 'Type', value: 'NFT Platform' },
    ],
    description:
      'A scalable NFT marketplace built on MERN stack and Web3.js. Features MetaMask wallet authentication, smart contract integration, and real-time blockchain transactions. Designed with optimized UI performance and seamless wallet interaction for buying, selling, and trading NFTs on-chain.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Web3.js', 'MetaMask', 'Smart Contracts'],
  },
  {
    icon: '⚽',
    name: 'Live Scores',
    accent: 'blue',
    methodology: null,
    featured: false,
    liveUrl: null,
    githubUrl: null,
    stats: [
      { label: 'Sports', value: '9 Games' },
      { label: 'Data', value: 'Rapid API' },
      { label: 'Type', value: 'Sports Tracker' },
    ],
    description:
      "A live score tracking platform where users can view live scores, scheduled matches, and completed results for nine sports including Soccer, Tennis, Volleyball, Badminton, Golf, and Basketball. Utilizes Rapid API for instant updates. Users can monitor team and player performances, follow commentary, and watch live games.",
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Rapid API', 'Axios'],
  },
  {
    icon: '✅',
    name: 'Habit Tracking App',
    accent: 'green',
    methodology: null,
    featured: false,
    liveUrl: 'https://habit-tracking-app-nokr.vercel.app/',
    githubUrl: 'https://github.com/Rameshmanohar18/Habit_tracking-app',
    stats: [
      { label: 'Type', value: 'Productivity' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Stack', value: 'React.js' },
    ],
    description:
      'A habit tracking application that helps users build and maintain daily habits. Users can create, track, and monitor their habits with a clean and intuitive interface. Designed to encourage consistency and productivity through visual progress tracking.',
    tech: [
      'React.js', 'JavaScript', 'CSS', 'Vercel',
      'Custom Hooks', 
      'LocalStorage', 'Responsive Design',
    ],
  },
  {
    icon: '🗂️',
    name: 'Portfolio',
    accent: 'purple',
    methodology: null,
    featured: false,
    liveUrl: 'https://portfolio-g6x7.vercel.app/',
    githubUrl: 'https://github.com/Rameshmanohar18/Portfolio',
    stats: [
      { label: 'Type', value: 'Personal Site' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Stack', value: 'React.js' },
    ],
    description:
      'A personal portfolio website showcasing my projects, skills, and experience as a full-stack developer. Built with React.js and features smooth animations, a responsive layout, and a modern design to highlight my work and professional background.',
    tech: [
      'React.js', 'JavaScript', 'CSS', 'Vercel','LocalStorage','Responsive Design',
    ],
  },
];

export default function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div ref={ref}>
          <span className={`section-label reveal ${visible ? 'visible' : ''}`}>Work</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>Featured Projects</h2>
          <p className={`projects-subtitle reveal ${visible ? 'visible' : ''}`}>
            A selection of real-world products I've built end-to-end.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} delay={i * 130} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, delay }) {
  const { ref, visible } = useReveal();
  const [expanded, setExpanded] = useState(false);

  /* 3-D tilt on mouse move */
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.01)`;
  };
  const resetTilt = (e) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={`project-card project-card--${project.accent} reveal ${visible ? 'visible' : ''} ${expanded ? 'project-card--expanded' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      {/* Glow orb */}
      <div className="project-card__orb" />

      {/* Top row */}
      <div className="project-card__top">
        <div className={`project-card__icon project-card__icon--${project.accent}`}>
          {project.icon}
        </div>
        <div className="project-card__badges">
          {project.featured && (
            <span className="project-card__featured">★ Featured</span>
          )}
          <span className={`project-card__num project-card__num--${project.accent}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="project-card__name">{project.name}</h3>

      {/* Methodology */}
      {project.methodology && (
        <p className="project-card__method">
          <span className="project-card__method-icon">⚙</span>
          {project.methodology}
        </p>
      )}

      {/* Stats row */}
      <div className="project-card__stats">
        {project.stats.map((s) => (
          <div key={s.label} className="project-card__stat">
            <span className="project-card__stat-val">{s.value}</span>
            <span className="project-card__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={`project-card__divider project-card__divider--${project.accent}`} />

      {/* Description — collapsed by default, expand on click */}
      <p className={`project-card__desc ${expanded ? 'project-card__desc--full' : ''}`}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="project-card__tags">
        {project.tech.map((t) => (
          <span key={t} className={`tag tag-${project.accent}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.liveUrl || project.githubUrl) && (
        <div className="project-card__links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card__link project-card__link--live project-card__link--${project.accent}`}
              aria-label={`Live site for ${project.name}`}
            >
              🔗 Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card__link project-card__link--github project-card__link--${project.accent}`}
              aria-label={`GitHub source for ${project.name}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source Code
            </a>
          )}
        </div>
      )}

      {/* Expand toggle */}
      <button
        className={`project-card__toggle project-card__toggle--${project.accent}`}
        onClick={() => setExpanded(v => !v)}
        aria-label={expanded ? 'Collapse' : 'Read more'}
      >
        {expanded ? '↑ Show less' : '↓ Read more'}
      </button>
    </div>
  );
}
