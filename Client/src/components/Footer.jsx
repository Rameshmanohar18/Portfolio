import { useState, useEffect } from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon, MapPinIcon, ArrowUpIcon, HeartIcon } from './icons';
import './Footer.css';

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/Rameshmanohar18',          Icon: GitHubIcon   },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ramesh-m-758a111aa/', Icon: LinkedInIcon },
  { label: 'Email',    href: 'mailto:rameshmanohar2001m@gmail.com',          Icon: EmailIcon    },
];

const NAV_LINKS = [
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Footer() {
  const [launched, setLaunched] = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTop = () => {
    setLaunched(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setLaunched(false), 1200);
    }, 400);
  };

  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="container">
        <div className="footer__top">

          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              Ramesh<span className="footer__logo-dot">.</span>dev
            </div>
            <p className="footer__tagline">
              Full Stack Developer · MERN Stack · Web3
            </p>
            <p className="footer__location">
              <MapPinIcon size={14} />
              Chennai, Tamil Nadu
            </p>
          </div>

          {/* Navigation column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <ul className="footer__nav">
              {NAV_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="footer__nav-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <ul className="footer__social">
              {SOCIAL_LINKS.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="footer__social-link"
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="footer__social-icon"><l.Icon size={16} /></span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Ramesh M. All rights reserved.
          </p>
          <p className="footer__made">
            Built with <span className="footer__heart"><HeartIcon size={13} /></span> using React
          </p>
        </div>
      </div>

      {/* Back-to-top */}
      <button
        className={`rocket-btn ${visible ? 'rocket-btn--visible' : ''} ${launched ? 'rocket-btn--launched' : ''}`}
        onClick={handleTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUpIcon size={20} />
      </button>
    </footer>
  );
}
