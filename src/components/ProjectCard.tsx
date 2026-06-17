import type { Project } from '../data/projects'
import './ProjectCard.css'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.id}>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        <div className="project-card__links">
          {project.liveUrl && (
            <a href={project.liveUrl} className="link" target="_blank" rel="noopener noreferrer">
              Demo ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} className="link" target="_blank" rel="noopener noreferrer">
              Código ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
