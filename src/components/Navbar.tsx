import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Contato', href: '#contato' },
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // Seção ativa: a que cruza o meio da tela. O hero entra na lista só
  // para apagar os links quando o visitante volta ao topo.
  useEffect(() => {
    const ids = ['hero', ...navLinks.map((link) => link.href.slice(1))]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <nav className="navbar__inner container">
        <a href="#" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Júlio Iwata
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${active === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                aria-current={active === link.href.slice(1) ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Atalho para a paleta de comandos (só no desktop) */}
          <li className="navbar__cmd-item">
            <button
              type="button"
              className="navbar__cmd"
              onClick={() => window.dispatchEvent(new Event('abrir-paleta'))}
              aria-label="Abrir paleta de comandos (Ctrl+K)"
            >
              <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
              <kbd>K</kbd>
            </button>
          </li>
        </ul>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
