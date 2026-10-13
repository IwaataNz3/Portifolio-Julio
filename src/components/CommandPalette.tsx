import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { projects } from '../data/projects'
import { getLenis, scrollToId } from '../lib/lenis'
import { EMAIL, GITHUB, LINKEDIN, copyEmail, downloadCv } from '../lib/actions'
import './CommandPalette.css'

type Command = {
  id: string
  group: 'Navegar' | 'Projetos' | 'Ações'
  label: string
  keywords?: string
  run: () => void
}

// Busca sem diferenciar acento nem maiúscula ("experiencia" acha "Experiência").
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Só religa a rolagem da página se nenhum outro painel tiver ficado aberto
// (ex.: a paleta fecha e logo em seguida abre o painel de um projeto).
const resumeScroll = () => {
  if (!document.querySelector('dialog[open]')) getLenis()?.start()
}

/** Paleta de comandos estilo editor de código: Ctrl+K (ou ⌘K) abre. */
function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const open = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    setQuery('')
    setActive(0)
    setCopied(false)
    dialog.showModal()
    getLenis()?.stop()
    inputRef.current?.focus()
  }

  // Fecha e já religa a rolagem, para o comando seguinte conseguir rolar a página.
  const close = () => {
    dialogRef.current?.close()
    resumeScroll()
  }

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialogRef.current?.open) close()
        else open()
      }
    }
    const onOpenRequest = () => open()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('abrir-paleta', onOpenRequest)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('abrir-paleta', onOpenRequest)
    }
  }, [])

  const goTo = (id: string) => () => {
    close()
    scrollToId(id)
  }

  const openLink = (url: string) => () => {
    close()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const commands: Command[] = [
    { id: 'inicio', group: 'Navegar', label: 'Início', keywords: 'topo hero', run: goTo('hero') },
    { id: 'sobre', group: 'Navegar', label: 'Sobre', keywords: 'formação faculdade', run: goTo('sobre') },
    { id: 'projetos', group: 'Navegar', label: 'Projetos', run: goTo('projetos') },
    { id: 'experiencia', group: 'Navegar', label: 'Experiência', keywords: 'trabalho cral', run: goTo('experiencia') },
    { id: 'contato', group: 'Navegar', label: 'Contato', run: goTo('contato') },
    { id: 'fora-do-codigo', group: 'Navegar', label: 'Fora do código', keywords: 'audiovisual fotografia clipes', run: goTo('fora-do-codigo') },
    ...projects.map((project): Command => ({
      id: `projeto-${project.id}`,
      group: 'Projetos',
      label: project.title,
      keywords: project.tech.join(' '),
      run: () => {
        close()
        window.dispatchEvent(new CustomEvent('abrir-projeto', { detail: project.id }))
      },
    })),
    {
      id: 'email',
      group: 'Ações',
      label: 'Copiar e-mail',
      keywords: 'email contato',
      run: async () => {
        if (await copyEmail()) {
          setCopied(true)
          window.setTimeout(close, 800)
        } else {
          close()
          window.location.href = `mailto:${EMAIL}`
        }
      },
    },
    { id: 'cv', group: 'Ações', label: 'Baixar currículo', keywords: 'cv pdf', run: () => { close(); downloadCv() } },
    { id: 'linkedin', group: 'Ações', label: 'Abrir LinkedIn', run: openLink(LINKEDIN) },
    { id: 'github', group: 'Ações', label: 'Abrir GitHub', keywords: 'repositorios codigo', run: openLink(GITHUB) },
  ]

  const term = normalize(query.trim())
  const results = commands.filter((command) =>
    normalize(`${command.label} ${command.group} ${command.keywords ?? ''}`).includes(term),
  )
  const current = results[Math.min(active, results.length - 1)]

  // Mantém o item selecionado visível quando a lista rola.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      current?.run()
    }
  }

  // Clique fora do painel fecha.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Paleta de comandos"
      data-lenis-prevent
      onClose={resumeScroll}
      onClick={handleClick}
    >
      <div className="palette__search">
        <span className="palette__prompt" aria-hidden="true">›</span>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-autocomplete="list"
          aria-activedescendant={current ? `cmd-${current.id}` : undefined}
          placeholder="Ir para uma seção, abrir um projeto..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={handleKeyDown}
        />
        <kbd>Esc</kbd>
      </div>

      <ul id="palette-list" ref={listRef} className="palette__list" role="listbox" aria-label="Comandos">
        {results.map((command) => (
          <li
            key={command.id}
            id={`cmd-${command.id}`}
            role="option"
            aria-selected={command === current}
            className="palette__item"
            onMouseMove={() => setActive(results.indexOf(command))}
            onClick={() => command.run()}
          >
            <span>{command.id === 'email' && copied ? 'E-mail copiado ✓' : command.label}</span>
            <span className="palette__group">{command.group}</span>
          </li>
        ))}
        {results.length === 0 && <li className="palette__empty">Nada encontrado</li>}
      </ul>

      <div className="palette__footer" aria-hidden="true">
        <span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span>
        <span><kbd>Enter</kbd> abrir</span>
      </div>
    </dialog>
  )
}

export default CommandPalette
