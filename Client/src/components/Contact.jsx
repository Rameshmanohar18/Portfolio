import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './Contact.css';

/* ── SVG Icons ── */
const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CONTACTS = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: 'rameshmanohar2001m@gmail.com',
    href: 'mailto:rameshmanohar2001m@gmail.com',
    accent: 'green',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: '+91 7010251221',
    href: 'tel:7010251221',
    accent: 'green',
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ramesh-m',
    href: 'https://linkedin.com/in/ramesh-m-758a111aa/',
    accent: 'blue',
  },
  {
    Icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/Rameshmanohar18',
    href: 'https://github.com/Rameshmanohar18',
    accent: 'purple',
  },
];

export default function Contact() {
  const { ref, visible } = useReveal();

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        {/* Two-column layout: left = heading + CTA, right = cards */}
        <div className="contact-layout">

          {/* Left column */}
          <div className="contact-left" ref={ref}>
            <span className={`section-label reveal ${visible ? 'visible' : ''}`}>
              Reach Out
            </span>
            <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
              Get In Touch
            </h2>
            <p className={`contact-desc reveal ${visible ? 'visible' : ''}`}>
              I'm currently open to new opportunities. Whether you have a project
              in mind, a question, or just want to say hi — my inbox is always open.
            </p>
            <a
              href="mailto:rameshmanohar2001m@gmail.com"
              className={`btn btn-primary contact-cta reveal ${visible ? 'visible' : ''}`}
            >
              Send a Message →
            </a>

            {/* Status badge */}
            <div className={`contact-status reveal ${visible ? 'visible' : ''}`}>
              <span className="contact-status__dot" />
              Available for full-time &amp; freelance roles
            </div>
          </div>

          {/* Right column — contact cards */}
          <div className="contact-right">
            {CONTACTS.map((c, i) => (
              <ContactItem key={c.label} contact={c} delay={i * 90} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactItem({ contact, delay }) {
  const { ref, visible } = useReveal();
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    /* Copy email/phone to clipboard, open links normally */
    if (!contact.href.startsWith('http')) {
      e.preventDefault();
      navigator.clipboard.writeText(contact.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <a
      ref={ref}
      href={contact.href}
      target={contact.href.startsWith('http') ? '_blank' : undefined}
      rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
      className={`contact-item contact-item--${contact.accent} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <div className={`contact-item__icon contact-item__icon--${contact.accent}`}>
        {copied ? <CheckIcon /> : <contact.Icon />}
      </div>
      <div className="contact-item__body">
        <div className="contact-item__label">{contact.label}</div>
        <div className="contact-item__value">
          {copied ? 'Copied to clipboard!' : contact.value}
        </div>
      </div>
      <span className="contact-item__arrow">
        {contact.href.startsWith('http') ? '↗' : copied ? '✓' : '⎘'}
      </span>
    </a>
  );
}
