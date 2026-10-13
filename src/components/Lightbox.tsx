import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import type { VisualItem } from '../data/visual'
import { getLenis } from '../lib/lenis'
import './Lightbox.css'

type LightboxProps = {
  item: VisualItem | null
  position: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Foto ampliada. O <dialog> nativo prende o foco e fecha com Esc; as setas passam de foto. */
function Lightbox({ item, position, total, onClose, onPrev, onNext }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (item && !dialog.open) {
      dialog.showModal()
      getLenis()?.stop()
    } else if (!item && dialog.open) {
      dialog.close()
    }
  }, [item])

  const close = () => ref.current?.close()

  const handleClosed = () => {
    if (!document.querySelector('dialog[open]')) getLenis()?.start()
    onClose()
  }

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) close()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') onPrev()
    if (event.key === 'ArrowRight') onNext()
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Imagem ampliada"
      data-lenis-prevent
      onClose={handleClosed}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item?.src && (
        <figure className="lightbox__figure">
          <img src={item.src} alt={item.alt} />
          <figcaption>
            <span>{item.caption}</span>
            <span>{pad(position)} / {pad(total)}</span>
          </figcaption>
        </figure>
      )}

      <button type="button" className="lightbox__close" onClick={close} aria-label="Fechar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {total > 1 && (
        <>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Imagem anterior">←</button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Próxima imagem">→</button>
        </>
      )}
    </dialog>
  )
}

export default Lightbox
