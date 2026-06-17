import { experiences } from '../data/experience'
import './ExperienceSection.css'

function ExperienceSection() {
  const exp = experiences[0] // Since there is only one, we just get the first

  return (
    <section className="experience" id="experiencia">
      <div className="experience__container">
        
        {/* Header */}
        <div className="experience__header">
          <h2 className="experience__title">
            Trajetória Profissional
          </h2>
          <p className="experience__subtitle">
            Meu percurso e evolução na área de tecnologia.
          </p>
        </div>

        {/* Single Experience Card */}
        <div className="experience__card">
          <div className="experience__card-top">
            <span className="experience__period">{exp.period}</span>
          </div>
          
          <div className="experience__card-body">
            <h3 className="experience__role">{exp.role}</h3>
            <span className="experience__company">✦ {exp.company}</span>
            <p className="experience__desc">{exp.description}</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
