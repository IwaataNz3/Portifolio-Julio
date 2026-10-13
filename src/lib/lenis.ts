import type Lenis from 'lenis'

// Guarda a instância do Lenis criada no App, para pausar a rolagem
// da página quando um painel (dialog) estiver aberto.
let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis() {
  return instance
}

export function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  if (instance) instance.scrollTo(target)
  else target.scrollIntoView({ behavior: 'smooth' })
}
