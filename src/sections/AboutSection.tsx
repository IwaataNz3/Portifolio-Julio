import { useState } from 'react'
import './AboutSection.css'

type TabId = 'academica' | 'experiencia' | 'projetos'

const tabs = [
  { id: 'academica', label: 'Formação Acadêmica', description: 'Base teórica sólida através de cursos técnicos e tecnólogos.' },
  { id: 'experiencia', label: 'Experiência', description: 'Trajetória profissional criando interfaces que resolvem problemas reais.' },
  { id: 'projetos', label: 'Projetos Acadêmicos', description: 'Laboratório de ideias, pesquisas e protótipos experimentais.' }
]

const codeSnippets: Record<TabId, string> = {
  academica: `const formacao = [
  {
    instituicao: "FIAP",
    curso: "Tecnologia e Desenvolvimento de Sistemas",
    tipo: "Tecnólogo",
    status: "Cursando",
    duracao: "2 anos"
  },
  {
    instituicao: "ETEC de Cotia",
    curso: "Análise e Desenvolvimento de Sistemas",
    tipo: "Técnico",
    status: "Concluído",
    duracao: "3 anos"
  }
];`,
  experiencia: `interface Experiencia {
  cargo: string;
  empresa: string;
  competencias: string[];
}

const timeline: Experiencia[] = [
  {
    cargo: "Suporte e Infraestrutura de TI",
    empresa: "CRAL Artigos para Laboratórios",
    competencias: [
      "Suporte Técnico",
      "Manutenção de Hardware & Software",
      "Segurança de Redes",
      "Sustentação de Infraestrutura"
    ]
  }
];`,
  projetos: `// Projetos em destaque
import { render } from 'engine';

export function lab() {
  return [
    { 
      name: "MicroGestor", 
      status: "1º Lugar EMPREENDESIM FEA-USP",
      role: "Arquitetura & Front-end",
      description: "Plataforma web de gestão para microempreendedores iniciantes."
    }
  ];
}`
}

const highlightCode = (code: string) => {
  return code
    .replace(/(".*?")/g, '<span class="token-str">$1</span>')
    .replace(/\b(const|let|var|interface|string|export|function|return|import|from)\b/g, '<span class="token-kw">$1</span>')
    .replace(/\b(instituicao|curso|status|certificacoes|cargo|empresa|stack|name|tipo|duracao|competencias|role|description)\b:/g, '<span class="token-key">$1</span>:')
    .replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>');
}

const techStack = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'React', 'TypeScript',
  'Java', 'SQL', 'Oracle', 'Node', 'Git'
];

const renderPreviewContent = (tab: TabId) => {
  switch (tab) {
    case 'academica':
      return (
        <div className="preview-academic">
          <div className="preview-badge">Formação</div>
          <div className="academic-list">
            <div className="academic-item">
              <div className="academic-header">
                <h4 className="academic-title">Tecnologia e Desenvolvimento de Sistemas</h4>
                <div className="academic-badges">
                  <span className="status-badge status-concluded">Tecnólogo</span>
                  <span className="status-badge status-progress">Cursando</span>
                </div>
              </div>
              <p className="academic-institution">FIAP — 2 Anos</p>
            </div>

            <div className="academic-divider" />

            <div className="academic-item">
              <div className="academic-header">
                <h4 className="academic-title">Análise e Desenvolvimento de Sistemas</h4>
                <div className="academic-badges">
                  <span className="status-badge status-concluded">Técnico</span>
                  <span className="status-badge status-concluded">Concluído</span>
                </div>
              </div>
              <p className="academic-institution">ETEC de Cotia — 3 Anos</p>
            </div>
          </div>
        </div>
      )
    case 'experiencia':
      return (
        <div className="preview-experience">
          <div className="preview-badge">Trajetória</div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>Suporte e Infraestrutura de TI</h4>
                  <span className="timeline-company">CRAL Artigos para Laboratórios</span>
                </div>
                <p className="timeline-description" style={{ fontSize: '0.85rem', color: '#a1a1a6', margin: '0 0 12px 0', lineHeight: '1.4', textAlign: 'left' }}>
                  Atuação na sustentação e melhoria da infraestrutura tecnológica da empresa, sendo responsável pelo suporte técnico, manutenção de hardware/software, além de garantir a estabilidade e segurança da rede interna.
                </p>
                <div className="timeline-tags">
                  <span>Suporte Técnico</span>
                  <span>Hardware & Software</span>
                  <span>Redes</span>
                  <span>Segurança de TI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    case 'projetos':
      return (
        <div className="preview-projects">
          <div className="preview-badge">Destaque</div>
          <h4 className="preview-heading">Projetos Acadêmicos</h4>
          <div className="projects-grid">
            <div className="project-preview-card" style={{ gridColumn: '1 / -1' }}>
              <div className="project-preview-card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '1.2rem' }}>MicroGestor</strong>
                  <span className="status-badge status-concluded" style={{ fontSize: '0.75rem', textAlign: 'center' }}>1º Lugar EMPREENDESIM<br />FEA-USP 2023</span>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#a1a1a6', fontWeight: 500 }}>Arquitetura & Front-end</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginTop: '12px', textAlign: 'left' }}>
                Plataforma web desenvolvida para auxiliar microempreendedores iniciantes a gerirem seus negócios de forma simples e acessível.
                Fui responsável por estruturar a arquitetura e desenvolvimento do front-end, garantindo uma interface intuitiva, além de estruturar e apresentar o pitch de vendas.
              </p>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabId>('academica')
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')

  return (
    <section className="about" id="sobre">
      <div className="about__container">

        {/* Giant Headline */}
        <div className="about__header">
          <h2 className="about__title">
            Minha vida <em>acadêmica</em> e <em>profissional</em>
          </h2>
          <p className="about__subtitle">
            Uma rotina dividida entre o aprofundamento técnico na universidade e a construção de produtos digitais no mercado. A teoria me dá a base e a prática molda minha excelência em desenvolvimento.
          </p>
        </div>

        {/* Interactive Component */}
        <div className="about__interactive">
          {/* Left: Tabs */}
          <div className="about__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`about__tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as TabId)}
              >
                <h3>{tab.label}</h3>
                <div className="about__tab-desc">
                  <p>{tab.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Mock IDE */}
          <div className="about__ide">
            <div className="ide-header">
              <div className="ide-controls">
                <span className="ide-dot close"></span>
                <span className="ide-dot minimize"></span>
                <span className="ide-dot expand"></span>
              </div>
              <div className="ide-title">
                {viewMode === 'code'
                  ? `${activeTab === 'academica' ? 'academic' : activeTab}.ts`
                  : 'preview.md'}
              </div>
              <div className="ide-mode-toggle">
                <button
                  className={`ide-toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
                  onClick={() => setViewMode('preview')}
                  title="Visualizar Formatação"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <span>Preview</span>
                </button>
                <button
                  className={`ide-toggle-btn ${viewMode === 'code' ? 'active' : ''}`}
                  onClick={() => setViewMode('code')}
                  title="Ver Código Fonte"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                  <span>Código</span>
                </button>
              </div>
            </div>
            <div className="ide-body">
              {viewMode === 'code' ? (
                <>
                  <div className="ide-line-numbers">
                    {codeSnippets[activeTab].split('\n').map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <pre className="ide-code" key={activeTab}>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(codeSnippets[activeTab]) }} />
                  </pre>
                </>
              ) : (
                <div className="ide-preview" key={`preview-${activeTab}`}>
                  {renderPreviewContent(activeTab)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Infinite Marquee */}
        <div className="about__marquee-wrapper">
          <div className="about__marquee-title">
            Conhecimento nas <em>linguagens</em>
          </div>
          <div className="about__marquee">
            <div className="about__marquee-content">
              {techStack.map((tech, i) => <span key={i}>{tech}</span>)}
              {techStack.map((tech, i) => <span key={'dup-' + i}>{tech}</span>)}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutSection
