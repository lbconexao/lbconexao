import { Link } from 'react-router-dom';
import Cinema from '../components/Cinema';
import Brand from '../components/Brand';
import Projects from '../components/Projects';
import { Arrow, ContactCTA, FAQ, Process, SectionHeading } from '../components/Primitives';
import { DivisionScene, SceneImage } from '../components/Scene';
import { divisions } from '../site.config';

export default function Hub() {
  return <>
    <section className="home-hero cinematic-home">
      <div className="scene-media" data-parallax><SceneImage scene="conexoes" priority /></div>
      <div className="scene-overlay" />
      <div className="container hero-content">
        <p className="eyebrow hero-enter"><span className="live-dot" /> UM ECOSSISTEMA. NOVAS POSSIBILIDADES.</p>
        <h1 className="hero-enter">Conectamos ideias.<br /><span>Desenvolvemos soluções.</span></h1>
        <p className="hero-description hero-enter">Tecnologia, educação em saúde e oportunidades digitais integradas em um único ecossistema.</p>
        <div className="hero-actions hero-enter">
          <Link className="button primary" to="/solucoes">Explorar soluções <Arrow diagonal /></Link>
          <Link className="button glass" to="/portfolio">Conhecer projetos <Arrow /></Link>
        </div>
        <Link className="hero-budget hero-enter" to="/contato">Solicitar orçamento <Arrow diagonal /></Link>
      </div>
      <div className="hero-bottom container"><span>TECNOLOGIA · CONHECIMENTO · OPORTUNIDADES</span><button onClick={() => document.getElementById('ecossistema')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Conheça o ecossistema <span aria-hidden="true">↓</span></button></div>
      <span className="scene-credit">Conexões urbanas · Fotografia ilustrativa</span>
    </section>
    <section className="ecosystem-intro section container" id="ecossistema">
      <div className="intro-heading" data-reveal-group><p className="eyebrow" data-reveal>ESSÊNCIAS DIFERENTES. CONEXÕES REAIS.</p><h2 data-reveal>Três áreas.<br /><em>Um mesmo propósito.</em></h2><p data-reveal>Conectar pessoas, conhecimento e tecnologia para transformar necessidades em novas possibilidades.</p></div>
      <div className="brand-lineup">{divisions.map(d => <Link key={d.id} to={`/${d.id}`} className={`brand-lineup-item division-${d.id}`} data-reveal><Brand division={d.id} /><span>{d.label}<Arrow diagonal /></span></Link>)}</div>
    </section>
    <DivisionScene division="dev" />
    <section className="editorial-break section container"><SectionHeading eyebrow="DA IDEIA AO QUE VEM DEPOIS" title="Soluções feitas para o seu próximo passo." text="Desenvolvimento personalizado, conhecimento que se conecta e atendimento consultivo. Cada projeto começa com uma conversa sobre o que realmente importa." /><Link className="text-link" to="/solucoes">Explorar nossas soluções <Arrow diagonal /></Link></section>
    <DivisionScene division="saude" />
    <DivisionScene division="store" />
    <Projects compact />
    <section className="brand-story"><div className="container brand-story-grid"><div data-reveal-group><p className="eyebrow" data-reveal>CONEXÕES COM PROPÓSITO</p><h2 data-reveal>O futuro ganha forma quando a gente se conecta.</h2><p data-reveal>Três áreas que compartilham uma forma de pensar: ouvir, colaborar e construir possibilidades.</p><Link className="text-link" to="/sobre" data-reveal>Conheça a LB Conexão <Arrow diagonal /></Link></div><div className="brand-film"><Cinema /></div></div></section>
    <Process /><FAQ /><ContactCTA />
  </>;
}
