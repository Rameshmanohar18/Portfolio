import useReveal from '../hooks/useReveal';
import './Skills.css';

const SKILLS = [
  { category: 'Languages',      icon: '⌨️', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
  { category: 'Frontend',       icon: '🎨', items: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI'] },
  { category: 'Backend',        icon: '⚙️', items: ['Node.js', 'Express.js', 'Socket.io'] },
  { category: 'Database',       icon: '🗄️', items: ['MongoDB', 'MySQL', 'Firebase'] },
  { category: 'Tools',          icon: '🛠️', items: ['Git', 'GitHub', 'Postman', 'Jira', 'VS Code'] },
  { category: 'Testing & Build',icon: '🧪', items: ['Vitest', 'Webpack', 'ESLint', 'Prettier'] },
  { category: 'API Integration',icon: '🔗', items: ['Axios', 'REST API', 'Rapid API'] },
];

const ROW1 = ['React.js','Node.js','TypeScript','MongoDB','Express.js','Socket.io','Redux Toolkit','Tailwind CSS','JavaScript','Web3.js','Solidity','REST API','React.js','Node.js','TypeScript','MongoDB','Express.js','Socket.io','Redux Toolkit','Tailwind CSS','JavaScript','Web3.js','Solidity','REST API'];
const ROW2 = ['Git','GitHub','Postman','Jira','Vitest','Webpack','ESLint','MySQL','Firebase','Material UI','Axios','HTML5','CSS3','Prettier','Git','GitHub','Postman','Jira','Vitest','Webpack','ESLint','MySQL','Firebase','Material UI','Axios','HTML5','CSS3','Prettier'];

export default function Skills() {
  const { ref, visible } = useReveal();
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div ref={ref}>
          <span className={`section-label reveal ${visible ? 'visible' : ''}`}>Expertise</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>Technical Skills</h2>
        </div>

        <div className="skills-marquee">
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {ROW1.map((s,i) => <span key={i} className="marquee-tag marquee-tag--green">{s}</span>)}
            </div>
          </div>
          <div className="marquee-wrapper">
            <div className="marquee-track marquee-track--rev">
              {ROW2.map((s,i) => <span key={i} className="marquee-tag marquee-tag--purple">{s}</span>)}
            </div>
          </div>
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
  return (
    <div ref={ref} className={`skill-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-card__header">
        <span className="skill-card__icon">{skill.icon}</span>
        <span className="skill-card__cat">{skill.category}</span>
      </div>
      <div className="skill-card__tags">
        {skill.items.map(item => <span key={item} className="tag">{item}</span>)}
      </div>
    </div>
  );
}
