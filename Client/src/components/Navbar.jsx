import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__brand">
          <img src="/avatar.jpeg" alt="Ramesh M" className="navbar__avatar" />
          <span className="navbar__logo">
            RM<span className="navbar__logo-dot">.</span>dev
          </span>
        </div>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
