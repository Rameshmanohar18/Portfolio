import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { EmailIcon, PhoneIcon, LinkedInIcon, GitHubIcon, CheckIcon } from './icons';
import './Contact.css';

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
