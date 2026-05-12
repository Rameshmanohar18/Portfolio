import useReveal from '../hooks/useReveal';
import { GraduationIcon, BookIcon, SchoolIcon, AwardIcon } from './icons';
import './Education.css';

const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'KLN College of Engineering',
    cgpa: '7.8',
    period: '2021 – 2023',
    Icon: GraduationIcon,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Thiagarajar College',
    cgpa: '8.59',
    period: '2018 – 2021',
    Icon: GraduationIcon,
  },
];

const SCHOOLING = [
  {
    level: '12th Standard (HSC)',
    school: 'MSP Solai Nadar Memorial Higher Secondary School',
    location: 'Dindigul – 624005',
    percentage: '82%',
    year: '2018',
    Icon: BookIcon,
  },
  {
    level: '10th Standard (SSLC)',
    school: 'MSP Solai Nadar Memorial Higher Secondary School',
    location: 'Dindigul – 624005',
    percentage: '84%',
    year: '2016',
    Icon: SchoolIcon,
  },
];

const CERTIFICATIONS = [
  {
    Icon: AwardIcon,
    name: 'IBM Developer Skills Certificate',
    issuer: 'MERN Full Stack Development',
    period: 'Sep 2025 – April 2026',
  },
];

export default function Education() {
  const { ref, visible } = useReveal();
  return (
    <section id="education" className="education-section">
      <div className="container">
        <div ref={ref}>
          <span className={`section-label reveal ${visible ? 'visible' : ''}`}>Academia</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>Education</h2>
        </div>

        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.degree} edu={edu} delay={i * 100} />
          ))}
        </div>

        <SchoolingSection />
        <CertSection />
      </div>
    </section>
  );
}

function EduCard({ edu, delay }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`edu-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="edu-card__icon"><edu.Icon size={28} /></div>
      <div className="edu-card__degree">{edu.degree}</div>
      <div className="edu-card__school">{edu.school}</div>
      <div className="edu-card__meta">
        <span className="edu-badge edu-badge--purple">CGPA: {edu.cgpa}</span>
        <span className="edu-badge edu-badge--muted">{edu.period}</span>
      </div>
    </div>
  );
}

function SchoolingSection() {
  const { ref, visible } = useReveal();
  return (
    <div className="schooling-section" ref={ref}>
      <div className="schooling-header">
        <span className={`section-label reveal ${visible ? 'visible' : ''}`}
          style={{ marginTop: '3rem', display: 'block' }}>
          Schooling
        </span>
        <h3 className={`section-title reveal ${visible ? 'visible' : ''}`}
          style={{ fontSize: '1.6rem' }}>
          School Education
        </h3>
      </div>
      <div className="schooling-grid">
        {SCHOOLING.map((s, i) => (
          <SchoolCard key={s.level} school={s} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

function SchoolCard({ school, delay }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`school-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="school-card__orb" />

      <div className="school-card__top">
        <div className="school-card__icon"><school.Icon size={24} /></div>
        <span className="school-card__year">{school.year}</span>
      </div>

      <div className="school-card__level">{school.level}</div>
      <div className="school-card__school">{school.school}</div>
      <div className="school-card__location">{school.location}</div>

      <div className="school-card__score-row">
        <div className="school-card__score-bar-wrap">
          <div
            className="school-card__score-bar"
            style={{ '--pct': school.percentage }}
          />
        </div>
        <span className="school-card__pct">{school.percentage}</span>
      </div>

      <div className="school-card__meta">
        <span className="edu-badge edu-badge--green">Secured {school.percentage}</span>
        <span className="edu-badge edu-badge--muted">{school.year}</span>
      </div>
    </div>
  );
}

function CertSection() {
  const { ref, visible } = useReveal();
  return (
    <div className="cert-section" ref={ref}>
      <span className={`section-label reveal ${visible ? 'visible' : ''}`}
        style={{ marginTop: '3rem', display: 'block' }}>
        Credentials
      </span>
      <h3 className={`section-title reveal ${visible ? 'visible' : ''}`}
        style={{ fontSize: '1.6rem' }}>
        Certifications
      </h3>
      <div className="cert-list">
        {CERTIFICATIONS.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}
      </div>
    </div>
  );
}

function CertCard({ cert }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`cert-card reveal ${visible ? 'visible' : ''}`}>
      <div className="cert-card__icon"><cert.Icon size={24} /></div>
      <div>
        <div className="cert-card__name">{cert.name}</div>
        <div className="cert-card__issuer">
          {cert.issuer} · {cert.period}
        </div>
      </div>
    </div>
  );
}
