import microgestor from '../assets/microgestor.webp'
import fundoProjeto from '../assets/fundo-projeto.webp'
import fundoProjeto1 from '../assets/fundo-projeto1.webp'
import fundoProjeto2 from '../assets/fundo-projeto2.webp'
import fundoProjeto3 from '../assets/fundo-projeto3.webp'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  /** Origem do projeto, aparece no painel de detalhes. */
  context: string
  /** Texto do painel de detalhes. */
  details: string
  /** Sua parte no projeto. Sem texto, o bloco não aparece. */
  role?: string
  /** Prêmio: vira o carimbo no card e o selo no painel. */
  award?: { title: string; detail: string }
  image?: string
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'microgestor',
    title: 'MicroGestor',
    description: 'Plataforma web para microempreendedores organizarem o negócio, do controle de caixa à declaração do MEI.',
    tech: ['React', 'Design Thinking'],
    // REVISAR: textos (fatos do perfil.md)
    context: 'TCC da Etec · Empreendesim FEA-USP',
    details:
      'Plataforma web no formato SaaS para microempreendedores. A ideia nasceu de um caso real: a mãe de uma amiga do grupo vendia brigadeiros e não conseguia organizar o negócio, com anotações em papel que se perdiam. Usamos Design Thinking para entender as dores desse público e levar o controle do papel para o digital. A plataforma tem controle de entradas e saídas, relatórios com gráficos por dia, mês ou ano, geração da declaração anual do MEI (DASN-SIMEI) e acesso a cursos gratuitos de empreendedorismo do Sebrae.',
    role: 'Estruturei a ideia e fiz o front-end e o design da aplicação, num time de cerca de 6 pessoas. O projeto foi o nosso TCC na Etec e ficou em 1º lugar no Empreendesim da FEA-USP, entre cerca de 8 equipes.',
    award: { title: '1º lugar', detail: 'Empreendesim FEA-USP 2023' },
    liveUrl: 'https://microgestor.vercel.app/',
    image: microgestor,
  },
  {
    id: 'ozzi-weird-store',
    title: 'Ozzi Weird Store',
    description: 'Um e-commerce criativo e diferenciado, focado em uma experiência visual única e interativa.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    // REVISAR: origem e detalhes. TODO: preencher role com a sua parte no projeto.
    context: 'Projeto pessoal',
    details: 'E-commerce com foco numa experiência visual diferente e interativa.',
    liveUrl: 'https://ozzi-weird-store.vercel.app/',
    repoUrl: 'https://github.com/IwaataNz3/ozzi-weird-store',
    image: fundoProjeto
  },
  {
    id: 'orbe-finance',
    title: 'Orbe Finance',
    description: 'Plataforma para gestão financeira e controle de gastos.',
    tech: ['JavaScript', 'Python', 'CSS'],
    // REVISAR: origem e detalhes. TODO: preencher role com a sua parte no projeto.
    context: 'Projeto pessoal',
    details: 'Plataforma de gestão financeira para organizar as finanças e controlar os gastos do dia a dia.',
    liveUrl: 'https://orbe-finance.vercel.app',
    repoUrl: 'https://github.com/IwaataNz3/Orbe-Finance',
    image: fundoProjeto1
  },
  {
    id: 'spacethon',
    title: 'SpaceThon - Global Solution FIAP',
    description: 'Projeto desenvolvido para o desafio Global Solution da FIAP focado em inovação espacial.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    // REVISAR: detalhes. TODO: preencher role com a sua parte no projeto.
    context: 'FIAP · Global Solution',
    details: 'Projeto da Global Solution da FIAP sobre inovação espacial, desenvolvido em grupo ao longo do semestre.',
    repoUrl: 'https://github.com/IwaataNz3/GlobalSolution-Front-FIAP',
    image: fundoProjeto2
  },
  {
    id: 'ecoguia',
    title: 'Ecoguia - Challenge FIAP',
    description: 'Solução desenvolvida para o Challenge FIAP, focada em guiar e promover práticas ecológicas.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    // REVISAR: detalhes. TODO: preencher role com a sua parte no projeto.
    context: 'FIAP · Challenge',
    details: 'Solução do Challenge da FIAP para orientar e incentivar práticas ecológicas no dia a dia.',
    repoUrl: 'https://github.com/IwaataNz3/Challenge-FrontEnd-FIAP',
    image: fundoProjeto3
  }
]
