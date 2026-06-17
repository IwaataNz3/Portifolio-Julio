import fundoProjeto from '../assets/fundo-projeto.png'
import fundoProjeto1 from '../assets/fundo-projeto1.png'
import fundoProjeto2 from '../assets/fundo-projeto2.png'
import fundoProjeto3 from '../assets/fundo-projeto3.png'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'ozzi-weird-store',
    title: 'Ozzi Weird Store',
    description: 'Um e-commerce criativo e diferenciado, focado em uma experiência visual única e interativa.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    liveUrl: 'https://ozzi-weird-store.vercel.app/',
    repoUrl: 'https://github.com/IwaataNz3/ozzi-weird-store',
    image: fundoProjeto
  },
  {
    id: 'orbe-finance',
    title: 'Orbe Finance',
    description: 'Plataforma para gestão financeira e controle de gastos.',
    tech: ['JavaScript', 'Python', 'CSS'],
    liveUrl: 'https://orbe-finance.vercel.app',
    repoUrl: 'https://github.com/IwaataNz3/Orbe-Finance',
    image: fundoProjeto1
  },
  {
    id: 'spacethon',
    title: 'SpaceThon - Global Solution FIAP',
    description: 'Projeto desenvolvido para o desafio Global Solution da FIAP focado em inovação espacial.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/IwaataNz3/GlobalSolution-Front-FIAP',
    image: fundoProjeto2
  },
  {
    id: 'ecoguia',
    title: 'Ecoguia - Challenge FIAP',
    description: 'Solução desenvolvida para o Challenge FIAP, focada em guiar e promover práticas ecológicas.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: 'https://github.com/IwaataNz3/Challenge-FrontEnd-FIAP',
    image: fundoProjeto3
  }
]
