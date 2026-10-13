import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import type { Project } from '../data/projects'
import { getLenis } from '../lib/lenis'
import './ProjectModal.css'

type ProjectModalProps = {
  project: Project | null
  position: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Painel com os detalhes de um projeto. O <dialog> nativo já prende o foco e fecha com Esc. */
function ProjectModal({ project, position, total, onClose, onPrev, onNext }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      getLenis()?.stop()
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const close = () => ref.current?.close()

  // Só religa a rolagem se nenhum outro painel tiver ficado aberto.
  const handleClosed = () => {
    if (!document.querySelector('dialog[open]')) getLenis()?.start()
    onClose()
  }

  // Clique no fundo escuro (fora do painel) fecha.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) close()
  }

  // Setas do teclado passam de projeto.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') onPrev()
    if (event.key === 'ArrowRight') onNext()
  }

  return (
    <dialog
      ref={ref}
      className="project-modal"
      aria-labelledby="project-modal-title"
      data-lenis-prevent
      onClose={handleClosed}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {project && (
        <div className="project-modal__inner">
          <button type="button" className="project-modal__close" onClick={close} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          {project.image && (
            <div className="project-modal__media">
              <img src={project.image} alt={`Tela do projeto ${project.title}`} />
            </div>
          )}

          <div className="project-modal__body">
            <span className="project-modal__context">{project.context}</span>
            {project.award && (
              <span className="project-modal__award">
                {project.award.title} · {project.award.detail}
              </span>
            )}
            <h3 id="project-modal-title" className="project-modal__title">{project.title}</h3>
            <p className="project-modal__details">{project.details}</p>

            {project.role && (
              <div className="project-modal__role">
                <span>Minha parte</span>
                <p>{project.role}</p>
              </div>
            )}

            <div className="project-card__tags">
              {project.tech.map((tech) => (
                <span className="project-card__tag" key={tech}>{tech}</span>
              ))}
            </div>

            <div className="project-modal__links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--live">
                  ⬈ Ver site
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn--repo">
                  Github ↗
                </a>
              )}
            </div>

            <div className="project-modal__nav">
              <button type="button" onClick={onPrev}>← Anterior</button>
              <span>{pad(position)} / {pad(total)}</span>
              <button type="button" onClick={onNext}>Próximo →</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default ProjectModal
