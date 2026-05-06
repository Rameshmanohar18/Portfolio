import React from 'react';
import useReveal from '../hooks/useReveal';
import './Experience.css';

const EXPERIENCE = [
  {
    role: 'Programmer',
    company: 'Osiz Technologies Pvt. Ltd.',
    location: 'Madurai, India',
    period: 'Jan 2024 – May 2025',
    bullets: [
      'Developed and deployed full-stack applications using React.js, Node.js, Express.js, and MongoDB, improving development efficiency by 30% through reusable components and modular backend APIs.',
      'Optimized frontend and backend performance, reducing page load time by 35% and improving API response times by 25% via query optimization and code refactoring.',
      'Integrated RESTful APIs and third-party services, handling complex data flows and ensuring consistent error handling across client and server layers.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Osiz Technologies Pvt. Ltd.',
    location: 'Madurai, India',
    period: 'Jun 2023 – Dec 2023',
    bullets: [
      'Completed hands-on training in ReactJS, Express.js, Node.js, JavaScript, HTML, CSS, and MongoDB.',
      'Developed proficiency in frontend and backend web development, including RESTful APIs and CRUD applications.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <SectionHeader label="Career" title="Work Experience" />
        <div className="exp-timeline">
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={exp.role} exp={exp} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ label, title }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref}>
      <span className={`section-label reveal ${visible ? 'visible' : ''}`}>{label}</span>
      <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>{title}</h2>
    </div>
  );
}

function ExpCard({ exp, delay }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`exp-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="exp-card__header">
        <div className="exp-card__role">{exp.role}</div>
        <div className="exp-card__period">{exp.period}</div>
      </div>
      <div className="exp-card__company">
        {exp.company} · {exp.location}
      </div>
      <ul className="exp-card__bullets">
        {exp.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
