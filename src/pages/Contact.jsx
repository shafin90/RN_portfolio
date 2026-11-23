const contacts = [
  {
    name: "Gmail",
    detail: "Start a conversation",
    href: "mailto:mashrafiahnam1@gmail.com",
    type: "gmail",
    external: false,
  },
  {
    name: "Upwork",
    detail: "View my freelance profile",
    href: "https://www.upwork.com/freelancers/~0162ee796651f12a34",
    type: "upwork",
    external: true,
  },
  {
    name: "LinkedIn",
    detail: "Connect professionally",
    href: "https://www.linkedin.com/in/mashrafi-ahnam/",
    type: "linkedin",
    external: true,
  },
];

function ContactIcon({ type }) {
  if (type === "gmail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
      </svg>
    );
  }
  if (type === "upwork") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#14A800" d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 5.5h18A1.5 1.5 0 0 1 26.5 7v18a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 25V7A1.5 1.5 0 0 1 7 5.5Z" fill="#0A66C2" />
      <path d="M10 13h3v10h-3zM11.5 11.7a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM16 13h2.9v1.4h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.5V23h-3v-5.1c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V23h-3z" fill="#fff" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section className="page contact-page" id="contact">
      <div className="wrap">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h1>Let’s talk about what you’re building.</h1>
          <p className="lede">Product Engineer. Tell me what you are building and what needs to work.</p>
        </div>
        <div className="contact-grid" aria-label="Ways to connect">
          {contacts.map((contact) => (
            <a
              className={`contact-card contact-card-${contact.type}`}
              href={contact.href}
              key={contact.type}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noreferrer" : undefined}
            >
              <span className="contact-icon"><ContactIcon type={contact.type} /></span>
              <span className="contact-card-copy">
                <strong>{contact.name}</strong>
                <small>{contact.detail}</small>
              </span>
              <span className="contact-card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="contact-email-bottom">Prefer email? <a href="mailto:mashrafiahnam1@gmail.com">mashrafiahnam1@gmail.com</a></p>
      </div>
    </section>
  );
}
