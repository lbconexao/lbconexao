import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../site.config';
const metadata: Record<string, [string, string]> = {
  '/': ['LB Conexão — Tecnologia, Saúde e Ofertas', 'Conectamos ideias e desenvolvemos soluções. Conheça o ecossistema LB Conexão DEV, Saúde e Store.'],
  '/dev': ['LB Conexão DEV — Tecnologia e Soluções Digitais', 'Sites, sistemas web, aplicativos, integrações e projetos digitais em desenvolvimento.'],
  '/saude': ['LB Conexão Saúde — Educação e Conhecimento', 'Educação em saúde, capacitações e desenvolvimento profissional conectados à prática.'],
  '/store': ['LB Conexão Store — Oportunidades e Parceiros', 'Conheça a vitrine de ofertas e oportunidades de parceiros da LB Conexão.'],
  '/sobre': ['Sobre a LB Conexão — Nosso ecossistema', 'Três áreas que conectam tecnologia, educação em saúde e oportunidades.'],
  '/solucoes': ['Soluções — LB Conexão', 'Explore soluções digitais, educação em saúde e a vitrine de parceiros.'],
  '/portfolio': ['Projetos em desenvolvimento — LB Conexão DEV', 'Conheça Hotspot PIX, plataforma de questionários e sistema para clínicas, projetos em desenvolvimento.'],
  '/contato': ['Contato e orçamento — LB Conexão', 'Conte sua necessidade e prepare uma mensagem para conversar com a LB Conexão.'],
  '/privacidade': ['Política de privacidade — LB Conexão', 'Saiba como funciona o formulário de contato e o tratamento de dados nesta versão do portal.'],
};
export default function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const project = projects.find(p => pathname === `/dev/produtos/${p.slug}`);
    const [title, description] = project ? [`${project.title} — LB Conexão DEV`, project.description] : metadata[pathname] || ['LB Conexão — Portal', 'Conheça o ecossistema LB Conexão.'];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    // Hash routes share a canonical document on GitHub Pages. Static OG is the crawler fallback.
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://lbconexao.github.io/lbconexao/#${pathname}`);
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    // Content is visible by default. Animations are added only upon intersection.
    // A missing/failed observer can never leave copy hidden.
    const selector = '[data-reveal], .section-heading, .service-card, .project-card, .process-list li, .values-grid article';
    const elements = [...document.querySelectorAll<HTMLElement>(selector)];
    document.querySelectorAll('[data-reveal-group]').forEach(group => group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i, 4) * 75}ms`)));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('scene-revealed'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    elements.forEach(el => observer.observe(el));
    // Small bounded image drift. Native scrolling is never intercepted.
    const active = new Set<HTMLElement>();
    const scenes = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    const imageObserver = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) active.add(e.target as HTMLElement); else active.delete(e.target as HTMLElement);
    }));
    scenes.forEach(el => imageObserver.observe(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduced.matches || window.innerWidth < 940) return;
      active.forEach(el => {
        const rect = el.parentElement!.getBoundingClientRect();
        const drift = Math.max(-18, Math.min(18, (innerHeight / 2 - rect.top - rect.height / 2) * .035));
        el.style.setProperty('--scene-drift', `${drift}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resetMotion = () => { if (reduced.matches) scenes.forEach(el => el.style.removeProperty('--scene-drift')); };
    window.addEventListener('scroll', onScroll, { passive: true });
    reduced.addEventListener('change', resetMotion);
    return () => {
      observer.disconnect(); imageObserver.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll); reduced.removeEventListener('change', resetMotion);
    };
  }, [pathname]);
  return null;
}
