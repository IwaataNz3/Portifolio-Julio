// Linha do tempo da seção Trajetória, em ordem cronológica.
// Fatos de ~/.claude/skills/candidaturas/perfil.md
// REVISAR: textos e datas

export interface Milestone {
  id: string
  period: string
  kind: 'Formação' | 'Conquista' | 'Trabalho' | 'Agora'
  title: string
  org: string
  description?: string
  tags?: string[]
}

export const milestones: Milestone[] = [
  {
    id: 'etec',
    period: '2021 a 2023',
    kind: 'Formação',
    title: 'Técnico em Análise e Desenvolvimento de Sistemas',
    org: 'Etec de Cotia',
    description: 'Curso técnico feito junto com o ensino médio. Foi onde comecei a programar.',
  },
  {
    id: 'microgestor',
    period: '2023',
    kind: 'Conquista',
    title: 'MicroGestor, 1º lugar no Empreendesim',
    org: 'FEA-USP',
    description:
      'Plataforma web para microempreendedores, criada como TCC da Etec. Estruturei a ideia e fiz o front-end e o design. Ficamos em 1º lugar entre cerca de 8 equipes.',
    tags: ['React', 'Design Thinking'],
  },
  {
    id: 'cral',
    period: 'jun 2024 a jun 2026',
    kind: 'Trabalho',
    title: 'Auxiliar de TI',
    org: 'CRAL Artigos para Laboratórios',
    description:
      'Atuei durante dois anos na sustentação e melhoria da infraestrutura tecnológica da empresa. Fui responsável pelo suporte técnico aos colaboradores, manutenção de hardware e software, além de garantir a estabilidade e a segurança da rede interna, otimizando os processos diários do negócio.',
    tags: ['Suporte N2', 'Redes', 'Infraestrutura', 'Hardware & Software'],
  },
  {
    id: 'fiap',
    period: '2026 a 2027',
    kind: 'Formação',
    title: 'Tecnologia em Desenvolvimento de Sistemas',
    org: 'FIAP · noturno · conclusão prevista em dez/2027',
    description:
      'Graduação com disciplinas de front-end, banco de dados Oracle, Java orientado a objetos, Python e inteligência artificial.',
  },
  {
    id: 'agora',
    period: 'Agora',
    kind: 'Agora',
    title: 'Procurando estágio ou vaga júnior',
    org: 'Disponível para início imediato',
  },
]
