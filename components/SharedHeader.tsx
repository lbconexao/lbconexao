import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Removed Supabase imports

interface HeaderProps {
  type?: 'hub' | 'saude' | 'dev' | 'store';
}

const SharedHeader: React.FC<HeaderProps> = ({ type = 'hub' }) => {
  const [user, setUser] = React.useState<{ email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('lb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('lb_user');
    setUser(null);
    window.location.reload();
  };

  const brandName = type === 'hub' ? 'LB Conexão' : `LB Conexão ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  const icon = type === 'saude' ? 'medical_services' : type === 'dev' ? 'code' : type === 'store' ? 'shopping_bag' : 'hub';
  const colorClass = type === 'saude' ? 'text-health' : type === 'store' ? 'text-store' : 'text-primary';

  const scrollToContato = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto">
        <Link to="/" className="flex items-center gap-3 md:gap-4">
          <div className={`size-8 md:size-10 flex items-center justify-center rounded-lg ${type !== 'hub' ? 'bg-slate-50' : ''}`}>
            <span className={`material-symbols-outlined text-2xl md:text-3xl ${colorClass}`}>{icon}</span>
          </div>
          <h2 className="text-primary text-lg md:text-xl font-bold leading-tight tracking-tight whitespace-nowrap">{brandName}</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-9">
          <Link to="/" className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">Home</Link>
          <Link to="/saude" className="text-slate-600 hover:text-health text-sm font-medium transition-colors">Saúde</Link>
          <Link to="/dev" className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">Dev</Link>
          <Link to="/store" className="text-slate-600 hover:text-store text-sm font-medium transition-colors">Store</Link>
          <button
            onClick={scrollToContato}
            className="text-slate-600 hover:text-primary text-sm font-medium transition-colors outline-none cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/admin" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest hidden md:block">Painel Adm</Link>
                <button onClick={handleSignOut} className="h-9 px-4 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all">Sair</button>
              </div>
            ) : (
              (type === 'saude' || type === 'store') && (
                <Link to="/login" className={`flex items-center justify-center rounded-lg h-9 px-6 text-white text-xs font-bold transition-all shadow-sm ${type === 'saude' ? 'bg-health hover:bg-health/90' : 'bg-store hover:bg-store/90'}`}>
                  Entrar
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden size-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-[60] animate-fadeIn p-6 flex flex-col gap-4">
          <Link onClick={() => setIsMenuOpen(false)} to="/" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-bold">
            <span className="material-symbols-outlined">home</span> Home
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/saude" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-bold">
            <span className="material-symbols-outlined text-health">medical_services</span> Saúde
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/dev" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-bold">
            <span className="material-symbols-outlined text-primary">code</span> Tecnologia (Dev)
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/store" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-bold">
            <span className="material-symbols-outlined text-store">shopping_bag</span> Store
          </Link>
          <button onClick={scrollToContato} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-bold text-left">
            <span className="material-symbols-outlined">chat</span> Contato
          </button>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
            {user ? (
              <>
                <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="text-center font-bold text-primary">Painel Administrador</Link>
                <button onClick={handleSignOut} className="h-12 w-full border border-red-200 text-red-600 font-bold rounded-xl active:bg-red-50">Sair da Conta</button>
              </>
            ) : (
              (type === 'saude' || type === 'store') && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`h-12 flex items-center justify-center rounded-xl text-white font-bold ${type === 'saude' ? 'bg-health' : 'bg-store'}`}>
                  Entrar no Portal
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default SharedHeader;
