import './HeroSection.css'
import BadgeCard from '../components/BadgeCard'
import fundoProjeto from '../assets/fundo-projeto.png'
import cvFile from '../assets/Curriculo Julio_Iwata.pdf'

function HeroSection() {
  return (
    <section className="hero" id="hero">
      {/* Background Soft Light & Explicit LEDs */}
      <div className="hero__bg-light" aria-hidden="true" />
      <div className="hero__led hero__led--left" aria-hidden="true" />
      <div className="hero__led hero__led--center" aria-hidden="true" />
      <div className="hero__led hero__led--right" aria-hidden="true" />

      <div className="hero__scanlines" aria-hidden="true" />

      {/* Top Left Content */}
      <div className="hero__top-left">
        <h1 className="hero__headline">
          Bem-vindo ao portfólio do meu <em>universo Tech</em>
        </h1>
        <p className="hero__sub">
          Explore <em>da melhor forma</em> minha vida como um desenvolvedor
          que está em busca de uma nova oportunidade na área de tecnologia.
        </p>
        <a href={cvFile} download="Curriculo_Julio_Iwata.pdf" className="btn-monologue" style={{ textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
        <p className="hero__footnote">
          Disponível para <span className="highlight">contratação imediata</span>
        </p>
      </div>

      {/* Top Right "Notes" Card */}
      <div className="hero__top-right">
        <div className="notes-card">
          <div className="notes-card__text">
            Conheça os<br />
            <em>Meus projetos</em>
          </div>
          <div className="notes-card__video">
            <img src={fundoProjeto} alt="Projetos" />
            <button className="notes-card__btn">
              Ver projetos
            </button>
          </div>
        </div>
      </div>

      {/* Giant Background Typography */}
      <div className="hero__giant-text" aria-hidden="true">
        Júlio Iwata
      </div>

      {/* Center Interactive ID Badge */}
      <div className="hero__center-stage">
        <div className="hero__stamp">
          <span>ACCESS</span><br />
          <em>GRANTED</em>
        </div>

        <BadgeCard />
      </div>
    </section>
  )
}

export default HeroSection
