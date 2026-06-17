import './ContactSection.css'

const socialLinks = [
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/julioiwata/',
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
    href: 'https://github.com/IwaataNz3',
    subtitle: 'Repositórios',
    hoverColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  { 
    label: 'Email', 
    href: 'mailto:iwatajulio@gmail.com',
    subtitle: 'Mensagem',
    hoverColor: '#ea4335',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    )
  },
]

function ContactSection() {
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
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>


      </div>
    </section>
  )
}

export default ContactSection
