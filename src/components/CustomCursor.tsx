import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

// Elementos com data-cursor="texto" mostram esse rótulo dentro do anel.
function getLabel(target: HTMLElement) {
  const labeled = target.closest<HTMLElement>('[data-cursor]');
  const interactive = target.closest('a, button');
  // Um link ou botão dentro de uma área com rótulo (ex.: o "CV" no crachá) fica sem rótulo.
  if (!labeled || (interactive && interactive !== labeled && labeled.contains(interactive))) return null;
  return labeled.dataset.cursor ?? null;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // Only enable on desktop/mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // A posição vai direto para o DOM a cada frame, sem re-render do React.
    let x = 0;
    let y = 0;
    let frame = 0;
    const render = () => {
      frame = 0;
      for (const el of [dotRef.current, ringRef.current]) {
        if (el) {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setIsHidden(false);
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setLabel(getLabel(target));
      setIsHovering(
        target.closest('a, button') !== null || target.classList.contains('interactive')
      );
    };

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Sempre no DOM (para as refs existirem); só fica invisível enquanto escondido.
  const hiddenClass = isHidden ? 'cursor--hidden' : '';

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering || label ? 'cursor-dot--hover' : ''} ${hiddenClass}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-ring--hover' : ''} ${label ? 'cursor-ring--label' : ''} ${hiddenClass}`}
      >
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
}
