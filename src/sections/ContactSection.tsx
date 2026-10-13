import { useEffect, useRef, useState } from 'react'
import { EMAIL, GITHUB, LINKEDIN, copyEmail } from '../lib/actions'
import './ContactSection.css'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: LINKEDIN,
    subtitle: 'Conectar',
    hoverColor: '#0077b5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: GITHUB,
    subtitle: 'Repositórios',
    hoverColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
]

const emailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const arrowIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const copyIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

function ContactSection() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Copia o e-mail e carimba o card. Se o navegador não deixar copiar,
  // abre o app de e-mail como antes.
  const handleEmail = async () => {
    if (!(await copyEmail())) {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section className="contact-section" id="contato">

      {/* Background Halftone Overlay */}
      <div className="contact-section__halftone"></div>

      <div className="contact-section__container">

        <div className="contact-section__content">
          <h2 className="contact-section__title">
            Vamos conversar?
          </h2>
        </div>

        <div className="contact-section__links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="abrir"
              style={{ '--hover-color': link.hoverColor } as React.CSSProperties}
            >
              <div className="contact-card__halftone-grain"></div>

              <div className="contact-card__content">
                <div className="contact-card__big-icon">
                  {link.icon}
                </div>
              </div>

              <div className="contact-card__footer">
                <div className="contact-card__meta">
                  <span className="contact-card__name">{link.label}</span>
                  <span className="contact-card__subtitle">{link.subtitle}</span>
                </div>

                {/* Small Right Arrow to indicate clickable */}
                <div className="contact-card__arrow">
                  {arrowIcon}
                </div>
              </div>
            </a>
          ))}

          {/* E-mail: copia o endereço em vez de abrir o app de e-mail */}
          <button
            type="button"
            className={`contact-card contact-card--email ${copied ? 'contact-card--copied' : ''}`}
            onClick={handleEmail}
            data-cursor="copiar"
            style={{ '--hover-color': '#ea4335' } as React.CSSProperties}
          >
            <div className="contact-card__halftone-grain"></div>

            <span className="contact-card__stamp" aria-hidden="true">
              <span>E-MAIL</span>
              <em>Copiado</em>
            </span>

            <div className="contact-card__content">
              <div className="contact-card__big-icon">
                {emailIcon}
              </div>
            </div>

            <div className="contact-card__footer">
              <div className="contact-card__meta">
                <span className="contact-card__name">Email</span>
                <span className="contact-card__subtitle">{EMAIL}</span>
              </div>

              <div className="contact-card__arrow" title="Copiar e-mail">
                {copyIcon}
              </div>
            </div>

            <span className="sr-only" aria-live="polite">
              {copied ? 'E-mail copiado' : 'Copiar e-mail'}
            </span>
          </button>
        </div>


      </div>
    </section>
  )
}

export default ContactSection
