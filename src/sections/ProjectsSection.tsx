import { useRef } from 'react'
import { projects } from '../data/projects'
import './ProjectsSection.css'

function ProjectsSection() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -532 : 532
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
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
          <div className="projects__carousel" ref={carouselRef}>
            {projects.map((project) => (
              <div className="project-card" key={project.id}>

                {/* Project Info (Now on Top) */}
                <div className="project-card__info">
                  <h3 className="project-card__title">{project.title}</h3>

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
                <div className="project-card__image-wrapper">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-card__image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="project-card__placeholder">
                      {/* Image slot without grain */}
                      <span className="placeholder-text">✦ {project.title} Preview</span>
                    </div>
                  )}
                </div>

                {/* Card Footer (Links) */}
                <div className="project-card__footer">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--live">
                      ⬈ Vercel
                    </a>
                  )}
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--repo">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg> Github
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Controls */}
        <div className="projects__controls">
          <button className="carousel-btn" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className="carousel-btn" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

      </div>
    </section>
  )
}

export default ProjectsSection
