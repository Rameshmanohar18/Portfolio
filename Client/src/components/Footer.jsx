import './Footer.css';

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/Rameshmanohar18',          icon: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ramesh-m-758a111aa/', icon: '💼' },
  { label: 'Email',    href: 'mailto:rameshmanohar2001m@gmail.com',          icon: '✉️' },
];

const NAV_LINKS = [
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="container">
        <div className="footer__top">

          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              RM<span className="footer__logo-dot">.</span>dev
            </div>
            <p className="footer__tagline">
              Full Stack Developer · MERN Stack · Web3
            </p>
            <p className="footer__location">📍 Chennai, Tamil Nadu</p>
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

          {/* Contact column */}
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
                    <span className="footer__social-icon">{l.icon}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Ramesh M. All rights reserved.
          </p>
          <p className="footer__made">
            Built with <span className="footer__heart">♥</span> using React
          </p>
        </div>
      </div>
    </footer>
  );
}
