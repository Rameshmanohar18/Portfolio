import useReveal from '../hooks/useReveal';
import './Contact.css';

const CONTACTS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'rameshmanohar2001m@gmail.com',
    href: 'mailto:rameshmanohar2001m@gmail.com',
    accent: 'green',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 7010251221',
    href: 'tel:7010251221',
    accent: 'green',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/ramesh-m',
    href: 'https://linkedin.com/in/ramesh-m-758a111aa/',
    accent: 'blue',
  },
  {
    icon: '🐙',
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
  return (
    <a
      ref={ref}
      href={contact.href}
      target={contact.href.startsWith('http') ? '_blank' : undefined}
      rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
      className={`contact-item contact-item--${contact.accent} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`contact-item__icon contact-item__icon--${contact.accent}`}>
        {contact.icon}
      </div>
      <div className="contact-item__body">
        <div className="contact-item__label">{contact.label}</div>
        <div className="contact-item__value">{contact.value}</div>
      </div>
      <span className="contact-item__arrow">→</span>
    </a>
  );
}
