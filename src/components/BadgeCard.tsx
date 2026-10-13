import { useEffect, useRef, useState, type MouseEvent } from 'react'
import './BadgeCard.css'
import fotoJulio from '../assets/foto-julio.webp'
import cvFile from '../assets/Curriculo Julio_Iwata.pdf'
import { GITHUB, LINKEDIN } from '../lib/actions'

// Verso do crachá: o resumo que um recrutador procura.
const fichaTecnica = [
  { label: 'Busco', value: 'Estágio ou júnior' },
  { label: 'Início', value: 'Imediato' },
  { label: 'Modelo', value: 'Remoto, híbrido ou presencial' },
  { label: 'Base', value: 'Cotia, SP' },
  { label: 'Inglês', value: 'Intermediário (B1)' },
  { label: 'FIAP', value: 'Conclusão em 2027' },
]

const stack = ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Python', 'MySQL']

function BadgeCard() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const flipping = useRef(false)
  const [side, setSide] = useState<'front' | 'back'>('front')

  // Inclina o crachá seguindo o mouse (só com mouse e sem "reduzir movimento").
  useEffect(() => {
    const badge = badgeRef.current
    const card = cardRef.current
    if (!badge || !card) return
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const rect = badge.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        card.classList.add('is-tilting')
        card.style.setProperty('--ry', `${x * 18}deg`)
        card.style.setProperty('--rx', `${-y * 14}deg`)
        card.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
        card.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      card.classList.remove('is-tilting')
      for (const prop of ['--ry', '--rx', '--gx', '--gy']) card.style.removeProperty(prop)
    }

    badge.addEventListener('pointermove', onMove)
    badge.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      badge.removeEventListener('pointermove', onMove)
      badge.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // Vira o crachá: fecha na horizontal, troca a face e abre de novo.
  const flip = () => {
    const card = cardRef.current
    const next = side === 'front' ? 'back' : 'front'
    if (!card || flipping.current) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSide(next)
      return
    }

    flipping.current = true
    const close = card.animate([{ scale: '1 1' }, { scale: '0 1' }], { duration: 160, easing: 'ease-in', fill: 'forwards' })
    close.onfinish = () => {
      setSide(next)
      const open = card.animate([{ scale: '0 1' }, { scale: '1 1' }], { duration: 220, easing: 'ease-out' })
      close.cancel()
      open.onfinish = () => {
        flipping.current = false
      }
    }
  }

  // Clicar em qualquer parte do crachá também vira (menos nos links e botões).
  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest('a, button')) return
    flip()
  }

  return (
    <div className="badge" ref={badgeRef}>
      <div className="badge-card" ref={cardRef} onClick={handleCardClick}>
        <div className="badge-clip"></div>

        <button
          type="button"
          className="badge-flip"
          onClick={flip}
          aria-label={side === 'front' ? 'Ver o verso do crachá' : 'Voltar para a frente do crachá'}
          title="Virar crachá"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
        </button>

        {side === 'front' ? (
          <>
            <div className="badge-photo">
              <img src={fotoJulio} alt="Júlio Iwata" />
              <div className="badge-hologram"></div>
            </div>
            <div className="badge-info">
              <div className="badge-name">JÚLIO IWATA</div>
              <div className="badge-role">FRONTEND DEV</div>

              <div className="badge-footer">
                <div className="badge-barcode"></div>
                <a href={cvFile} download="Curriculo_Julio_Iwata.pdf" className="badge-download" style={{ textDecoration: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  CV
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="badge-back">
            <div className="badge-back__header">
              <span>VERSO</span>
              <em>Ficha técnica</em>
            </div>

            <dl className="badge-back__list">
              {fichaTecnica.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="badge-back__stack">
              {stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="badge-back__links">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BadgeCard
