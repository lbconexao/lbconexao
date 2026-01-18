
import React from 'react';
import { Link } from 'react-router-dom';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import { IMAGES } from '../constants';

const Hub: React.FC = () => {
  return (
    <div id="top" className="flex flex-col min-h-screen scroll-smooth">
      <SharedHeader type="hub" />
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(31, 68, 117, 0.85) 0%, rgba(19, 24, 31, 0.9) 100%), url("${IMAGES.HUB_BG}")`
          }}
        >
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
            <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tight">LB Conexão</h1>
            <p className="text-slate-200 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              Saúde, Tecnologia e Comércio Conectados em um único ecossistema digital inteligente.
            </p>
          </div>
        </div>

        {/* Division Cards */}
        <div className="max-w-[1200px] mx-auto px-4 -mt-16 relative z-20 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/saude" className="group bg-white p-8 rounded-2xl shadow-xl border-t-4 border-health hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-health">health_and_safety</span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-health transition-colors">LB Conexão Saúde</h3>
              <p className="text-slate-500 text-sm">Capacitação, telemedicina e gestão para o bem-estar.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-auto">Acessar Portal</span>
            </Link>

            <Link to="/dev" className="group bg-white p-8 rounded-2xl shadow-xl border-t-4 border-primary hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-primary">terminal</span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">LB Conexão Dev</h3>
              <p className="text-slate-500 text-sm">Soluções digitais, APIs e inovação tecnológica sob medida.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-auto">Acessar Hub</span>
            </Link>

            <Link to="/store" className="group bg-white p-8 rounded-2xl shadow-xl border-t-4 border-store hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-store">storefront</span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-store transition-colors">LB Conexão Store</h3>
              <p className="text-slate-500 text-sm">Marketplace exclusivo de equipamentos e serviços digitais.</p>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-auto">Acessar Loja</span>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-[1100px] mx-auto px-4 text-center">
            <h2 className="text-primary text-3xl md:text-4xl font-black mb-12">Nossas Conexões</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <div className="h-48 rounded-xl bg-cover bg-center shadow-md mb-2" style={{ backgroundImage: `url("${IMAGES.HEALTH_POST_1}")` }}></div>
                <h4 className="text-xl font-bold text-slate-900">Saúde Integrada</h4>
                <p className="text-slate-600 text-sm">Educação e tecnologia para transformar o atendimento médico.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-48 rounded-xl bg-cover bg-center shadow-md mb-2" style={{ backgroundImage: `url("${IMAGES.DEV_BANNER}")` }}></div>
                <h4 className="text-xl font-bold text-slate-900">Inovação Dev</h4>
                <p className="text-slate-600 text-sm">Construindo as infraestruturas do amanhã.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-48 rounded-xl bg-cover bg-center shadow-md mb-2" style={{ backgroundImage: `url("${IMAGES.STETHOSCOPE}")` }}></div>
                <h4 className="text-xl font-bold text-slate-900">Store Especializada</h4>
                <p className="text-slate-600 text-sm">Os melhores produtos com garantia LB Conexão.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter type="hub" />
    </div>
  );
};

export default Hub;
