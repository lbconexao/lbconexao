import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { asset, Division } from '../site.config';
import Brand from './Brand';
import { Arrow } from './Primitives';

export type SceneName = 'conexoes' | 'dev-work' | 'saude' | 'store';
const descriptions: Record<SceneName, string> = {
  conexoes: 'Vista ampla de uma cidade, com edifícios e céu iluminado. Fotografia ilustrativa de conexões urbanas.',
  'dev-work': 'Mãos trabalhando em um notebook com código de desenvolvimento. Fotografia ilustrativa.',
  saude: 'Grupo em uma atividade de educação em saúde com instrutora e manequim de treinamento. Fotografia ilustrativa, sem vínculo com a LB Conexão.',
  store: 'Notebook, fones e acessórios em uma mesa de trabalho. Composição ilustrativa, sem oferta de produtos.',
};

export function SceneImage({ scene, priority = false, className = '' }: { scene: SceneName; priority?: boolean; className?: string }) {
  return <img
    className={`scene-image ${className}`}
    src={asset(`v3/${scene}-1600.webp`)}
    srcSet={`${asset(`v3/${scene}-800.webp`)} 800w, ${asset(`v3/${scene}-1600.webp`)} 1600w`}
    sizes="100vw" width={1600} height={1067}
    alt={descriptions[scene]} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'} decoding="async"
    onError={event => {
      const image = event.currentTarget;
      if (image.dataset.fallback) return;
      image.dataset.fallback = 'true'; image.removeAttribute('srcset');
      image.src = asset('ecossistema.webp');
      image.alt = 'Identidades oficiais LB Conexão DEV, Saúde e Store';
    }}
  />;
}

export function DivisionScene({ division }: { division: Division }) {
  const content = {
    dev: { scene: 'dev-work' as const, label: 'TECNOLOGIA E SOLUÇÕES DIGITAIS', title: 'Tecnologia que transforma ideias em soluções.', text: 'Sites, sistemas e experiências digitais. Seu próximo passo começa com uma solução pensada para você.', cta: 'Conhecer o DEV' },
    saude: { scene: 'saude' as const, label: 'EDUCAÇÃO E DESENVOLVIMENTO', title: 'Conhecimento que conecta e transforma.', text: 'Educação em saúde, troca de experiências e capacitação profissional conectadas à prática.', cta: 'Conhecer a Saúde' },
    store: { scene: 'store' as const, label: 'DESCOBERTAS E OPORTUNIDADES', title: 'Oportunidades conectadas a você.', text: 'Uma nova forma de descobrir produtos e oportunidades em lojas parceiras. Escolhas com informação e transparência.', cta: 'Explorar ofertas' },
  }[division];
  return <section className={`division-scene scene-${division} division-${division}`} aria-labelledby={`scene-title-${division}`}>
    <div className="scene-media" data-parallax><SceneImage scene={content.scene} /></div>
    <div className="scene-overlay" />
    <div className="scene-content container">
      <div className="scene-copy" data-reveal-group>
        <p className="eyebrow" data-reveal>LB CONEXÃO {division === 'saude' ? 'SAÚDE' : division.toUpperCase()} / {content.label}</p>
        <h2 id={`scene-title-${division}`} data-reveal>{content.title}</h2>
        <p data-reveal>{content.text}</p>
        <Link className="button primary" to={`/${division}`} data-reveal>{content.cta}<Arrow diagonal /></Link>
      </div>
    </div>
    <span className="scene-credit">Fotografia ilustrativa · Pexels</span>
  </section>;
}

export function DivisionHero({ division, title, text, children }: { division: Division; title: ReactNode; text: string; children: ReactNode }) {
  return <>
    <section className={`division-hero photo-hero scene-${division}`}>
      <div className="scene-media" data-parallax><SceneImage scene={division === 'dev' ? 'dev-work' : division} priority /></div>
      <div className="scene-overlay" />
      <div className="container division-hero-content" data-reveal-group>
        <p className="eyebrow" data-reveal>LB CONEXÃO {division === 'saude' ? 'SAÚDE' : division.toUpperCase()}</p>
        <h1 data-reveal>{title}</h1><p data-reveal>{text}</p>
        <div className="hero-actions" data-reveal>{children}</div>
      </div>
      <span className="scene-credit">Fotografia ilustrativa · Pexels</span>
    </section>
    <div className={`division-signature division-${division}`}><div className="container"><div className="signature-mark"><Brand division={division} /></div><div><span className="eyebrow">PARTE DO ECOSSISTEMA LB CONEXÃO</span><p>{division === 'dev' ? 'Tecnologia e Soluções Digitais.' : division === 'saude' ? 'Saúde e Conhecimento que Conectam.' : 'Ofertas que conectam você ao melhor.'}</p></div><Link className="text-link" to="/sobre">Conheça nossa conexão <Arrow diagonal /></Link></div></div>
  </>;
}
