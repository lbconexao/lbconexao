import { Link } from 'react-router-dom';
import { projects } from '../site.config';
import { Arrow, SectionHeading } from './Primitives';

export function ProductMockup({ variant = 'hotspot' }: { variant?: string }) {
  const isHotspot = variant === 'hotspot';
  const isQuestions = variant === 'questionario';
  const name = isHotspot ? 'HOTSPOT PIX' : isQuestions ? 'QUESTIONÁRIOS' : 'CLÍNICAS';
  const sections = isHotspot ? ['Visão geral', 'Acessos', 'Sessões', 'Configurações'] : isQuestions ? ['Visão geral', 'Questionários', 'Respostas', 'Configurações'] : ['Visão geral', 'Agenda', 'Organização', 'Configurações'];
  return <div className={`product-mockup ${variant}`} aria-label="Interface conceitual demonstrativa, sem dados reais">
    <div className="mockup-top"><span className="window-dots">● ● ●</span><span>LB CONEXÃO DEV / {name}</span><span>CONCEITO</span></div>
    <div className="mockup-body">
      <div className="mockup-sidebar"><b>LB<span>.</span></b>{sections.map((s, i) => <span key={s} className={i === 0 ? 'selected' : ''}>{s}</span>)}</div>
      <div className="mockup-content">
        <div className="mockup-heading"><div><small>SEU ESPAÇO DE GESTÃO</small><h4>{isHotspot ? 'Conexões sob controle.' : isQuestions ? 'Perguntas que geram conhecimento.' : 'Mais clareza na sua rotina.'}</h4></div><span className="mockup-avatar">LB</span></div>
        <div className="mockup-summary">{(isHotspot ? ['Acessos', 'Sessões', 'Integrações'] : isQuestions ? ['Formulários', 'Respostas', 'Relatórios'] : ['Agenda', 'Organização', 'Permissões']).map(t => <div key={t}><span>{t}</span><strong>—</strong><small>Visão demonstrativa</small></div>)}</div>
        <div className="mockup-workspace">
          <div className="mockup-workspace-heading"><b>{isHotspot ? 'Acompanhamento da rede' : isQuestions ? 'Organize sua próxima pesquisa' : 'Uma visão dos seus agendamentos'}</b><span>Planejado</span></div>
          {isQuestions ? <div className="mockup-question"><small>MODELO DE QUESTIONÁRIO</small><b>Como podemos melhorar sua experiência?</b><div><i /> Sua resposta começa aqui</div><div><i /> Outra possibilidade</div><span className="mockup-action">Próxima pergunta ↗</span></div> : isHotspot ? <><div className="mockup-chart">{[36, 52, 40, 66, 55, 82, 68, 96, 85, 110].map((h, i) => <i key={i} style={{ height: h }} />)}</div><div className="mockup-axis"><span>VISUALIZAÇÃO ILUSTRATIVA</span><span>Sem dados reais</span></div></> : <div className="mockup-calendar">{['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map((d, i) => <div key={d}><b>{d}</b><span className={i % 2 ? 'slot pale' : 'slot'}>Horário</span><span className={i % 2 ? 'slot' : 'slot pale'}>Disponível</span></div>)}</div>}
        </div>
      </div>
    </div><span className="demo-label">INTERFACE DEMONSTRATIVA · PRODUTO EM DESENVOLVIMENTO</span>
  </div>;
}

export default function Projects({ compact = false, showHeading = true }: { compact?: boolean; showHeading?: boolean }) {
  return <section className={`section portfolio-showcase ${compact ? 'compact-projects' : ''}`} id="projetos"><div className="container">
    {showHeading && <SectionHeading eyebrow="EM CONSTRUÇÃO NA LB CONEXÃO DEV" title="O próximo capítulo já está tomando forma." text="Projetos próprios, novas possibilidades. Conheça a direção das soluções que estamos desenvolvendo.">{compact && <Link className="text-link" to="/portfolio">Explorar portfólio <Arrow /></Link>}</SectionHeading>}
    <div className="projects-grid">{projects.map((p, i) => <article className={`project-card project-${p.variant}`} key={p.slug}>
      <Link className="project-visual" to={`/dev/produtos/${p.slug}`} aria-label={`Conhecer ${p.title}`}><ProductMockup variant={p.variant} /></Link>
      <div className="project-copy"><div className="project-meta"><span className="project-number">0{i + 1} /</span><span className="status"><i />Em desenvolvimento</span></div><span className="project-category">{p.category}</span><h3><Link to={`/dev/produtos/${p.slug}`}>{p.title}<Arrow diagonal /></Link></h3><p>{p.description}</p><Link className="text-link" to={`/dev/produtos/${p.slug}`}>Conhecer a solução <Arrow diagonal /></Link></div>
    </article>)}</div>
  </div></section>;
}
