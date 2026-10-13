import { useEffect, useRef } from 'react'
import { milestones } from '../data/experience'
import './ExperienceSection.css'

function ExperienceSection() {
  const journeyRef = useRef<HTMLDivElement>(null)

  // A linha de LED acende conforme a página rola, e cada marco
  // acende quando a luz passa por ele.
  useEffect(() => {
    const journey = journeyRef.current
    if (!journey) return

    let frame = 0
    const update = () => {
      frame = 0
      const dots = journey.querySelectorAll<HTMLElement>('.journey__dot')
      if (dots.length < 2) return

      const box = journey.getBoundingClientRect()
      const first = dots[0].getBoundingClientRect()
      const last = dots[dots.length - 1].getBoundingClientRect()
      const start = first.top + first.height / 2
      const end = last.top + last.height / 2
      const focus = window.innerHeight * 0.6
      const progress = Math.min(1, Math.max(0, (focus - start) / (end - start)))
      const lightY = start + progress * (end - start)

      journey.style.setProperty('--track-top', `${start - box.top}px`)
      journey.style.setProperty('--track-height', `${end - start}px`)
      journey.style.setProperty('--progress', String(progress))

      dots.forEach((dot) => {
        const center = dot.getBoundingClientRect().top + dot.offsetHeight / 2
        dot.closest('.journey__item')?.classList.toggle('is-lit', center <= lightY + 1)
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <section className="experience" id="experiencia">
      <div className="experience__container">

        {/* Header */}
        <div className="experience__header">
          <h2 className="experience__title">
            Trajetória
          </h2>
          <p className="experience__subtitle">
            Meu percurso e evolução na área de tecnologia.
          </p>
        </div>

        {/* Linha do tempo */}
        <div className="journey" ref={journeyRef}>
          <span className="journey__track" aria-hidden="true">
            <span className="journey__fill" />
          </span>

          <ol className="journey__list">
            {milestones.map((milestone) => (
              <li
                key={milestone.id}
                className={`journey__item ${milestone.kind === 'Agora' ? 'journey__item--now' : ''}`}
              >
                <span className="journey__date">{milestone.period}</span>
                <span className="journey__dot" aria-hidden="true" />

                <div className="journey__card">
                  <span className="journey__kind">{milestone.kind}</span>
                  <h3 className="journey__title">{milestone.title}</h3>
                  <span className="journey__org">{milestone.org}</span>
                  {milestone.description && <p className="journey__desc">{milestone.description}</p>}
                  {milestone.tags && (
                    <div className="journey__tags">
                      {milestone.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
