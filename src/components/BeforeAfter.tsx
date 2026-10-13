import { useState, type CSSProperties } from 'react'
import './BeforeAfter.css'

type BeforeAfterProps = {
  before: string
  after: string
  alt: string
}

/**
 * Comparação antes/depois com uma linha fina arrastável.
 * Um <input type="range"> invisível cobre a imagem: dá arraste com mouse,
 * toque no celular e setas do teclado sem código extra.
 */
function BeforeAfter({ before, after, alt }: BeforeAfterProps) {
  const [position, setPosition] = useState(50)

  return (
    <div className="before-after" style={{ '--pos': `${position}%` } as CSSProperties}>
      <img src={after} alt={`${alt} (depois do color grading)`} className="before-after__img" loading="lazy" decoding="async" />
      <img src={before} alt="" className="before-after__img before-after__img--before" loading="lazy" decoding="async" />

      <span className="before-after__label before-after__label--before" aria-hidden="true">Antes</span>
      <span className="before-after__label before-after__label--after" aria-hidden="true">Depois</span>

      <span className="before-after__divider" aria-hidden="true">
        <span className="before-after__handle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 3 12 9 18" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </span>
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="before-after__range"
        aria-label="Comparar antes e depois do color grading"
        data-cursor="arrastar"
      />
    </div>
  )
}

export default BeforeAfter
