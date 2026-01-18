
import React from 'react';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import InstagramFeed from '../components/InstagramFeed';
import { IMAGES } from '../constants';

const Dev: React.FC = () => {
  return (
    <div id="top" className="flex flex-col min-h-screen scroll-smooth">
      <SharedHeader type="dev" />
      <main className="flex-grow">
        {/* Hero */}
        <section className="p-4 md:p-10">
          <div
            className="max-w-[1280px] mx-auto min-h-[500px] rounded-3xl overflow-hidden bg-cover bg-center relative flex items-end p-8 md:p-16"
            style={{
              backgroundImage: `linear-gradient(rgba(19, 24, 31, 0.4) 0%, rgba(19, 24, 31, 0.8) 100%), url("${IMAGES.DEV_BANNER}")`
            }}
          >
            <div className="relative z-10 max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">LB Conexão Dev</h1>
              <p className="text-slate-200 text-lg md:text-xl font-light mb-8">
                Soluções digitais que conectam ideias a resultados. Transformamos sua visão em tecnologia de ponta escalável e segura.
              </p>
              <button
                onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-10 bg-primary text-white font-bold rounded-lg shadow-2xl hover:bg-primary/90 transition-all active:scale-95"
              >
                Ver Serviços
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="servicos" className="py-20 scroll-mt-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <h2 className="text-primary text-3xl font-black mb-12 border-l-8 border-slate-300 pl-6">Serviços Dev</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'language', title: 'Sites Institucionais', desc: 'Design moderno e responsivo para fortalecer sua presença digital.' },
                { icon: 'terminal', title: 'Sistemas Web', desc: 'Aplicações personalizadas desenvolvidas sob medida para suas regras.' },
                { icon: 'domain', title: 'Portais Corporativos', desc: 'Intranets e portais robustos para grandes organizações.' },
                { icon: 'analytics', title: 'Dashboards e Dados', desc: 'Painéis inteligentes para tomada de decisão baseada em fatos.' },
                { icon: 'hub', title: 'Integrações API', desc: 'Conecte seus sistemas e automatize fluxos de trabalho complexos.' },
                { icon: 'medical_services', title: 'Sistemas de Saúde', desc: 'Especialistas em desenvolvimento para o setor HealthTech.' },
              ].map((s, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                  <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:text-primary">{s.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Integration */}
        <InstagramFeed handle="lbconexaodev" division="dev" />

        {/* Contact CTA */}
        <section className="py-20 bg-slate-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-slate-900 text-4xl font-black mb-6">Transforme seu projeto em realidade</h2>
              <p className="text-slate-600 text-lg mb-8">Entre em contato com nossa equipe especializada e descubra como podemos levar sua empresa para o próximo nível digital.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-primary">check_circle</span> Orçamento sem compromisso
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-primary">check_circle</span> Equipe multidisciplinar sênior
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Contato Dev</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
                  const message = encodeURIComponent(`Olá, meu nome é ${name} e gostaria de solicitar um orçamento.`);
                  window.open(`https://wa.me/5595981204347?text=${message}`, '_blank');
                }}
              >
                <input name="name" type="text" placeholder="Seu nome completo" required className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4" />
                <button type="submit" className="w-full h-14 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all">Solicitar Orçamento via WhatsApp</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter type="dev" />
    </div>
  );
};

export default Dev;
