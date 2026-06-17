import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <hr className="divider" />

        <div className="footer__content">
          <div className="footer__left">
            <span className="footer__name">Júlio Iwata</span>
            <span className="footer__copy">© {year} — Todos os direitos reservados</span>
          </div>

          <nav className="footer__nav">
            <a href="#sobre" className="footer__link">Sobre</a>
            <a href="#projetos" className="footer__link">Projetos</a>
            <a href="#experiencia" className="footer__link">Experiência</a>
            <a href="#contato" className="footer__link">Contato</a>
          </nav>
        </div>

        {/* Ghost name — footer dramatic close */}
        <div className="footer__ghost" aria-hidden="true">
          Iwata
        </div>
      </div>
    </footer>
  )
}

export default Footer
