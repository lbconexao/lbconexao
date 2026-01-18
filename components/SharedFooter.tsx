
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  type?: 'hub' | 'saude' | 'dev' | 'store';
}

const SharedFooter: React.FC<FooterProps> = ({ type = 'hub' }) => {
  const isHub = type === 'hub';

  return (
    <footer id="contato" className="bg-primary text-white py-16 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium mb-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-slate-300 transition-colors uppercase tracking-widest outline-none"
          >
            Início
          </button>
          <span className="hidden md:inline text-white/20">|</span>
          <Link className="hover:text-health transition-colors uppercase tracking-widest" to="/saude">Saúde</Link>
          <span className="hidden md:inline text-white/20">|</span>
          <Link className="hover:text-blue-400 transition-colors uppercase tracking-widest" to="/dev">Tecnologia</Link>
          <span className="hidden md:inline text-white/20">|</span>
          <Link className="hover:text-store transition-colors uppercase tracking-widest" to="/store">Store</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
          {/* Emails - Vertical List */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Canais de E-mail</h4>
            <div className="flex flex-col gap-3">
              {(isHub || type === 'saude') && (
                <a href="mailto:lbconexaosaude@gmail.com" className="group flex items-center gap-3 text-sm hover:text-health transition-all">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-health/20 transition-all">
                    <span className="material-symbols-outlined text-base">medical_services</span>
                  </div>
                  <span>Saúde: <strong className="font-bold">lbconexaosaude@gmail.com</strong></span>
                </a>
              )}
              {(isHub || type === 'dev') && (
                <a href="mailto:lbconexaodev@gmail.com" className="group flex items-center gap-3 text-sm hover:text-blue-400 transition-all">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-400/20 transition-all">
                    <span className="material-symbols-outlined text-base">code</span>
                  </div>
                  <span>Dev: <strong className="font-bold">lbconexaodev@gmail.com</strong></span>
                </a>
              )}
              {(isHub || type === 'store') && (
                <a href="mailto:lbconexaostore@gmail.com" className="group flex items-center gap-3 text-sm hover:text-store transition-all">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-store/20 transition-all">
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                  </div>
                  <span>Store: <strong className="font-bold">lbconexaostore@gmail.com</strong></span>
                </a>
              )}
            </div>
          </div>

          {/* Support - Horizontal List on Hub, Specific on Pages */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Suporte WhatsApp</h4>
            <div className={`flex ${isHub ? 'flex-wrap justify-center md:justify-start gap-4' : 'flex-col gap-3'}`}>
              {(isHub || type === 'saude') && (
                <a href="https://wa.me/5595981204347" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm hover:text-green-400 transition-all py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10">
                  <span className="material-symbols-outlined text-xl text-green-500 group-hover:scale-110 transition-transform">chat</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isHub ? 'Saúde' : 'Atendimento'}</span>
                    <span className="font-bold">(95) 98120-4347</span>
                  </div>
                </a>
              )}
              {(isHub || type === 'dev') && (
                <a href="https://wa.me/5595981204347" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm hover:text-green-400 transition-all py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10">
                  <span className="material-symbols-outlined text-xl text-green-500 group-hover:scale-110 transition-transform">chat</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isHub ? 'Dev' : 'Atendimento'}</span>
                    <span className="font-bold">(95) 98120-4347</span>
                  </div>
                </a>
              )}
              {(isHub || type === 'store') && (
                <a href="https://wa.me/5595981204347" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm hover:text-green-400 transition-all py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10">
                  <span className="material-symbols-outlined text-xl text-green-500 group-hover:scale-110 transition-transform">chat</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isHub ? 'Store' : 'Atendimento'}</span>
                    <span className="font-bold">(95) 98120-4347</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10"></div>
        <div className="text-center text-sm text-slate-400 font-light max-w-2xl">
          <p className="mb-2">© 2026 LB Conexão – Liderando a integração entre saúde e tecnologia.</p>
          <p className="text-[10px] uppercase tracking-widest opacity-50">Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;
