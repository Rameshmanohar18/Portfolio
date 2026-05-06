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
  return (
    <div
      ref={ref}
      className={`project-card project-card--${project.accent} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
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

      {/* Description */}
      <p className="project-card__desc">{project.description}</p>

      {/* Tech tags */}
      <div className="project-card__tags">
        {project.tech.map((t) => (
          <span key={t} className={`tag tag-${project.accent}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
