import { useState } from 'react'
import { visual } from '../data/visual'
import BeforeAfter from '../components/BeforeAfter'
import './OffCodeSection.css'

const pad = (n: number) => String(n).padStart(2, '0')

function OffCodeSection() {
  const { comparisons } = visual
  const [current, setCurrent] = useState(0)
  const active = comparisons[current]

  if (!active) return null

  return (
    <section className="offcode" id="fora-do-codigo" aria-labelledby="offcode-title">
      <div className="offcode__halftone" aria-hidden="true"></div>

      <div className="offcode__container">
        <div className="offcode__header">
          <h2 className="offcode__title" id="offcode-title">
            Fora do <em>código</em>
          </h2>
          <div className="offcode__intro">
            <p>{visual.intro}</p>
            {visual.instagram && (
              <a href={visual.instagram} target="_blank" rel="noopener noreferrer" className="offcode__link">
                ⬈ Ver mais no Instagram
              </a>
            )}
          </div>
        </div>

        {/* Comparador grande: a key troca a foto inteira ao mudar de par */}
        <div className="offcode__viewer">
          <BeforeAfter key={active.id} before={active.before} after={active.after} alt={active.alt} />
        </div>

        <div className="offcode__meta">
          <span>Color grading · {active.caption}</span>
          <span>Arraste para comparar{comparisons.length > 1 && ` · ${pad(current + 1)} / ${pad(comparisons.length)}`}</span>
        </div>

        {comparisons.length > 1 && (
          <div className="offcode__thumbs" role="group" aria-label="Escolher foto">
            {comparisons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="offcode__thumb"
                aria-pressed={index === current}
                aria-label={item.caption}
                onClick={() => setCurrent(index)}
              >
                <img src={item.after} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default OffCodeSection
