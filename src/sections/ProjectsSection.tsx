import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import './ProjectsSection.css'

const pad = (n: number) => String(n).padStart(2, '0')

function ProjectsSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // A paleta de comandos (Ctrl+K) também abre projetos.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const index = projects.findIndex((p) => p.id === (event as CustomEvent<string>).detail)
      if (index >= 0) setOpenIndex(index)
    }
    window.addEventListener('abrir-projeto', onOpen)
    return () => window.removeEventListener('abrir-projeto', onOpen)
  }, [])

  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + projects.length) % projects.length))

  // Distância de um card para o outro (largura + espaço), que muda no celular.
  const getStep = () => {
    const carousel = carouselRef.current
    const card = carousel?.querySelector<HTMLElement>('.project-card')
    if (!carousel || !card) return 0
    return card.offsetWidth + parseFloat(getComputedStyle(carousel).columnGap || '0')
  }

  const scroll = (direction: 'left' | 'right') => {
    const step = getStep()
    carouselRef.current?.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  // Atualiza o contador "01 / 04" conforme o carrossel anda.
  const handleScroll = () => {
    const carousel = carouselRef.current
    const step = getStep()
    if (!carousel || !step) return
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4
    const index = atEnd ? projects.length - 1 : Math.round(carousel.scrollLeft / step)
    setCurrent(Math.min(projects.length - 1, Math.max(0, index)))
  }

  return (
    <section className="projects" id="projetos">
      <div className="projects__container">

        {/* Header */}
        <div className="projects__header">
          <div className="projects__header-content">
            <h2 className="projects__title">
              Projetos em destaque
            </h2>
            <p className="projects__subtitle">
              Conheça meus projetos! É aqui que eu ponho na prática tudo o que eu aprendo.
            </p>
          </div>
        </div>

        {/* Projects Carousel with Blur Mask */}
        <div className="projects__carousel-wrapper">
          <div className="projects__carousel" ref={carouselRef} onScroll={handleScroll}>
            {projects.map((project, projectIndex) => (
              <div className={`project-card ${project.award ? 'project-card--featured' : ''}`} key={project.id}>

                {/* Project Info (Now on Top) */}
                <div className="project-card__info">
                  {project.award && (
                    <span className="project-card__award">
                      {project.award.title} · {project.award.detail}
                    </span>
                  )}
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="project-card__tags">
                    {project.tech.map((techItem, index) => (
                      <span className="project-card__tag" key={index}>
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image (Now in Middle) */}
                <button
                  type="button"
                  className="project-card__image-wrapper"
                  onClick={() => setOpenIndex(projectIndex)}
                  data-cursor="ver"
                  aria-label={`Ver detalhes do projeto ${project.title}`}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-card__image" loading="lazy" decoding="async" />
                  ) : (
                    <span className="project-card__placeholder">
                      <span className="placeholder-text">✦ {project.title} Preview</span>
                    </span>
                  )}
                  <span className="project-card__more" aria-hidden="true">+ Detalhes</span>
                  {project.award && (
                    // Carimbo no mesmo estilo do ACCESS GRANTED do hero
                    <span className="project-card__stamp" aria-hidden="true">
                      <span>{project.award.detail}</span>
                      <em>{project.award.title}</em>
                    </span>
                  )}
                </button>

                {/* Card Footer (Links) */}
                <div className="project-card__footer">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--live">
                      ⬈ Vercel
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--repo">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg> Github
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Controls */}
        <div className="projects__controls">
          <button className="carousel-btn" onClick={() => scroll('left')} disabled={current === 0} aria-label="Projeto anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="projects__counter" aria-live="polite">
            {pad(current + 1)} <span aria-hidden="true">/</span><span className="sr-only">de</span> {pad(projects.length)}
          </span>
          <button className="carousel-btn" onClick={() => scroll('right')} disabled={current === projects.length - 1} aria-label="Próximo projeto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

      </div>

      <ProjectModal
        project={openIndex === null ? null : projects[openIndex]}
        position={(openIndex ?? 0) + 1}
        total={projects.length}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  )
}

export default ProjectsSection
