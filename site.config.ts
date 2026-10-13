export type Division = 'dev' | 'saude' | 'store';
export const asset = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

// Contacts retained from the existing institutional website. Confirm ownership before publication.
export const company = {
  name: 'LB Conexão',
  legalName: 'LB CONEXÃO EMPREENDIMENTOS E SERVIÇOS LTDA',
  tagline: 'O seu ecossistema completo de Tecnologia, Saúde e Ofertas.',
  whatsapp: '5595981204347',
  phone: '(95) 98120-4347',
  emails: { dev: 'lbconexaodev@gmail.com', saude: 'lbconexaosaude@gmail.com', store: 'lbconexaostore@gmail.com' },
  social: { dev: 'https://www.instagram.com/lbconexaodev/', saude: 'https://www.instagram.com/lbconexaosaude/', store: 'https://www.instagram.com/lbconexaostore/' },
};

export const divisions = [
  { id: 'dev' as const, number: '01', name: 'DEV', label: 'Tecnologia e Soluções Digitais', title: 'Ideias que ganham código.', description: 'Sites, sistemas e experiências digitais pensados para a sua necessidade.', tags: ['Desenvolvimento', 'Sistemas', 'Integrações'], cta: 'Explorar tecnologia' },
  { id: 'saude' as const, number: '02', name: 'SAÚDE', label: 'Saúde e Conhecimento que Conectam', title: 'Conhecimento que transforma.', description: 'Educação, capacitação e desenvolvimento profissional conectados à prática.', tags: ['Educação', 'Capacitação', 'Conhecimento'], cta: 'Conhecer a área de saúde' },
  { id: 'store' as const, number: '03', name: 'STORE', label: 'Ofertas que conectam você ao melhor', title: 'Boas escolhas, novas conexões.', description: 'Um espaço para descobrir produtos e oportunidades em lojas parceiras.', tags: ['Curadoria', 'Parceiros', 'Oportunidades'], cta: 'Explorar a Store' },
];

export const devServices = [
  { title: 'Sites & landing pages', text: 'Sua presença digital com identidade, clareza e uma experiência que funciona em qualquer tela.', features: ['Site institucional e páginas de campanha', 'Navegação responsiva e SEO básico'], category: 'PRESENÇA DIGITAL' },
  { title: 'Sistemas & software', text: 'Ferramentas sob encomenda para organizar processos e atender às regras do seu negócio.', features: ['Sistemas web, gestão e agendamento', 'Desenvolvimento e licenciamento sob escopo'], category: 'SOFTWARE SOB MEDIDA' },
  { title: 'Aplicativos & PWAs', text: 'Experiências digitais acessíveis pelo navegador, com recursos definidos para cada projeto.', features: ['Interfaces para dispositivos móveis', 'Fluxos de uso e funcionalidades personalizadas'], category: 'EXPERIÊNCIAS MÓVEIS' },
  { title: 'Dados & dashboards', text: 'Informação organizada para acompanhar operações e apoiar decisões.', features: ['Painéis administrativos e bancos de dados', 'Questionários e plataformas de coleta'], category: 'INFORMAÇÃO CONECTADA' },
  { title: 'APIs & integrações', text: 'Conexões entre ferramentas para reduzir etapas manuais e melhorar o fluxo de informação.', features: ['Integração com APIs disponíveis', 'Automação de rotinas conforme viabilidade'], category: 'PROCESSOS INTEGRADOS' },
  { title: 'Consultoria & evolução', text: 'Apoio técnico para planejar, manter e evoluir soluções digitais.', features: ['Consultoria em tecnologia da informação', 'Suporte e manutenção com escopo contratado'], category: 'CONTINUIDADE' },
];

// Status confirmed by the owner during the redesign on 2026-10-12.
export const projects = [
  { slug: 'hotspot-pix', title: 'Hotspot PIX', category: 'GESTÃO DE ACESSO WI-FI', description: 'Software em desenvolvimento para gerenciar acessos a redes Wi-Fi, sessões e integração de pagamentos PIX.', features: ['Portal de autenticação', 'Controle de sessões e permissões', 'Integração de pagamentos PIX', 'Painel de acompanhamento'], variant: 'hotspot' },
  { slug: 'questionarios', title: 'Plataforma de questionários', category: 'COLETA & ORGANIZAÇÃO DE DADOS', description: 'Projeto de uma plataforma para criar questionários, organizar respostas e acompanhar informações.', features: ['Criação de questionários', 'Organização de respostas', 'Painéis de acompanhamento', 'Exportação de dados'], variant: 'questionario' },
  { slug: 'clinicas', title: 'Sistema para clínicas', category: 'TECNOLOGIA PARA GESTÃO', description: 'Projeto de software voltado à organização de rotinas administrativas de clínicas.', features: ['Organização de agendamentos', 'Gestão de rotinas administrativas', 'Permissões de acesso', 'Painéis de gestão'], variant: 'clinicas' },
];

export interface Offer { id: string; title: string; category: string; description: string; image: string; url: string; partner: string; affiliate: boolean; approved: boolean; }
export const offers: Offer[] = []; // Only verified offers with permission to publish.
export const storeCategories = ['Todas', 'Tecnologia', 'Saúde e bem-estar', 'Dia a dia'];
export const publicationPending = [
  'Contrato social registrado e CNPJ atualizado: validar serviços e CNAEs com contador/jurídico.',
  'Confirmar titularidade dos contatos e perfis herdados do site anterior.',
  'Cadastrar ofertas reais autorizadas e a agenda real de capacitações.',
  'Confirmar escopo implementado e materiais públicos dos três projetos em desenvolvimento.',
  'Validar missão, visão e valores propostos no texto institucional.',
  'Revisar o backend legado de autenticação e permissões antes de reativar o painel.',
];

export function safeExternalUrl(value: string) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
