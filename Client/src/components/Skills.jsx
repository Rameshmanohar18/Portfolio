import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { CodeIcon, MonitorIcon, ServerIcon, DatabaseIcon, ToolIcon, TestIcon, ApiIcon } from './icons';
import './Skills.css';

const SKILLS = [
  { category: 'Languages',      Icon: CodeIcon,     level: 90, color: 'green',  items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
  { category: 'Frontend',       Icon: MonitorIcon,  level: 92, color: 'purple', items: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI'] },
  { category: 'Backend',        Icon: ServerIcon,   level: 85, color: 'green',  items: ['Node.js', 'Express.js', 'Socket.io'] },
  { category: 'Database',       Icon: DatabaseIcon, level: 80, color: 'blue',   items: ['MongoDB', 'MySQL', 'Firebase'] },
  { category: 'Tools',          Icon: ToolIcon,     level: 88, color: 'purple', items: ['Git', 'GitHub', 'Postman', 'Jira', 'VS Code'] },
  { category: 'Testing & Build',Icon: TestIcon,     level: 75, color: 'blue',   items: ['Vitest', 'Webpack', 'ESLint', 'Prettier'] },
  { category: 'API Integration',Icon: ApiIcon,      level: 87, color: 'green',  items: ['Axios', 'REST API', 'Rapid API'] },
];

export default function Skills() {
  const { ref, visible } = useReveal();
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div ref={ref}>
          <span className={`section-label reveal ${visible ? 'visible' : ''}`}>Expertise</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>Technical Skills</h2>
        </div>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} delay={i * 75} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, delay }) {
  const { ref, visible } = useReveal();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied]   = useState(null);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item).then(() => {
      setCopied(item);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div
      ref={ref}
      className={`skill-flip reveal ${visible ? 'visible' : ''} ${flipped ? 'skill-flip--flipped' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* ── Front ── */}
      <div className={`skill-card skill-card--front skill-card--${skill.color}`}>
        <div className="skill-card__header">
          <span className="skill-card__icon"><skill.Icon size={22} /></span>
          <span className="skill-card__cat">{skill.category}</span>
        </div>
        <div className="skill-card__tags">
          {skill.items.map(item => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
        <div className="skill-card__hint">hover to see level →</div>
      </div>

      {/* ── Back ── */}
      <div className={`skill-card skill-card--back skill-card--${skill.color}`}>
        <div className="skill-card__back-icon"><skill.Icon size={28} /></div>
        <div className="skill-card__back-cat">{skill.category}</div>
        <div className="skill-card__back-level">{skill.level}%</div>
        <div className="skill-card__bar-wrap">
          <div
            className={`skill-card__bar skill-card__bar--${skill.color}`}
            style={{ '--bar-w': `${skill.level}%` }}
          />
        </div>
        <div className="skill-card__back-tags">
          {skill.items.map(item => (
            <button
              key={item}
              className={`tag skill-tag ${copied === item ? 'skill-tag--copied' : ''}`}
              onClick={() => handleCopy(item)}
              title="Click to copy"
            >
              {copied === item ? '✓' : item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
