import { useState } from 'react'
import { visual } from '../data/visual'
import Lightbox from '../components/Lightbox'
import BeforeAfter from '../components/BeforeAfter'
import './OffCodeSection.css'

function OffCodeSection() {
  // O lightbox navega só pelas imagens que já existem.
  const photos = visual.items.filter((item) => item.src)
  const [open, setOpen] = useState<number | null>(null)

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length))

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

        <ul className="offcode__grid">
          {visual.items.map((item) => (
            <li key={item.id} className="offcode__item">
              {item.compare ? (
                <BeforeAfter before={item.compare.before} after={item.compare.after} alt={item.alt} />
              ) : item.src ? (
                <button
                  type="button"
                  className="offcode__photo"
                  onClick={() => setOpen(photos.indexOf(item))}
                  aria-label={`Ampliar: ${item.alt || item.caption}`}
                  data-cursor="ver"
                >
                  <img src={item.src} alt="" loading="lazy" decoding="async" />
                </button>
              ) : (
                <div className="offcode__placeholder">
                  <span>✦ Adicionar still</span>
                </div>
              )}
              <span className="offcode__caption">{item.caption}</span>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        item={open === null ? null : photos[open]}
        position={(open ?? 0) + 1}
        total={photos.length}
        onClose={() => setOpen(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  )
}

export default OffCodeSection
