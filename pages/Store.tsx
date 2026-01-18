
import React, { useState, useMemo, useEffect } from 'react';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import InstagramFeed from '../components/InstagramFeed';
import { IMAGES, PRODUCTS_DATA as STATIC_PRODUCTS } from '../constants';
import { Product } from '../types';
import { supabase } from '../supabaseClient';

const ITEMS_PER_PAGE = 12;

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data && data.length > 0) {
        // Combinar dados estáticos com dados do banco
        // Usamos um Map para garantir IDs únicos se necessário
        const dynamicProducts = data.map((p: any) => ({
          ...p,
          price: Number(p.price),
          oldPrice: p.old_price ? Number(p.old_price) : undefined
        }));

        setProducts([...STATIC_PRODUCTS, ...dynamicProducts]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (category === 'Todos') return products;
    return products.filter(p => p.category === category);
  }, [category, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product as Product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Bloquear scroll do corpo quando o modal estiver aberto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  return (
    <div id="top" className="flex flex-col min-h-screen scroll-smooth">
      <SharedHeader type="store" />
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative bg-primary overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
            <img src={IMAGES.STORE_BANNER} className="w-full h-full object-cover" alt="Store Banner" />
          </div>
          <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-10 text-white py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-store animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">Novidades da Semana</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">LB Conexão <span className="text-store">Store</span></h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-lg font-light mb-8">Produtos e soluções premium que impulsionam resultados. Equipe seu negócio com o melhor.</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-8 bg-store text-white font-bold rounded-lg shadow-lg hover:shadow-store/30 transition-all flex items-center gap-2 active:scale-95"
              >
                Ver Catálogo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-[64px] z-40 bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-4 flex gap-4 overflow-x-auto no-scrollbar items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">Filtrar:</span>
            {['Todos', 'Saúde', 'Tecnologia'].map((cat, i) => (
              <button
                key={i}
                onClick={() => { setCategory(cat); setCurrentPage(1); }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${category === cat ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <section id="catalogo" className="py-16 bg-slate-50 scroll-mt-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black text-slate-900">Catálogo {category !== 'Todos' && `- ${category}`}</h2>
              <p className="text-sm text-slate-500 font-medium">{filteredProducts.length} itens encontrados</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {currentItems.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 px-2 py-1 bg-white/90 rounded text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-slate-900 font-bold text-lg mb-1 leading-snug group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="mt-auto pt-4 space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-store font-black text-xl">R$ {product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                          <span className="text-slate-300 text-sm line-through">R$ {product.oldPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button className="w-full h-12 bg-store text-white font-black rounded-xl shadow-lg shadow-store/20 hover:bg-store/90 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">visibility</span> Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`size-10 rounded-lg text-sm font-bold transition-all ${currentPage === idx + 1 ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{selectedProduct.category}</span>
                <h2 className="text-3xl font-black text-primary mb-4 leading-tight">{selectedProduct.name}</h2>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-store">R$ {selectedProduct.price.toFixed(2)}</span>
                    {selectedProduct.oldPrice && (
                      <span className="text-slate-300 text-lg line-through">R$ {selectedProduct.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {selectedProduct.oldPrice && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">Promoção</span>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Descrição</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-health">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Produto em estoque
                  </div>
                  <button className="w-full h-14 bg-store text-white font-black rounded-2xl shadow-xl shadow-store/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">shopping_cart</span> Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits - Reallocated to page content */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-store/10 flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-store text-3xl font-bold">verified_user</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Compra 100% Segura</h3>
              <p className="text-slate-500 text-sm">Transações criptografadas e dados protegidos.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-store/10 flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-store text-3xl font-bold">local_shipping</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Entrega Garantida</h3>
              <p className="text-slate-500 text-sm">Rastreamento em tempo real para todo o Brasil.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-store/10 flex items-center justify-center mb-2 shadow-sm">
                <span className="material-symbols-outlined text-store text-3xl font-bold">support_agent</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Suporte Especializado</h3>
              <p className="text-slate-500 text-sm">Tire dúvidas com nossa equipe técnica.</p>
            </div>
          </div>
        </section>

        {/* Instagram Integration */}
        <InstagramFeed handle="lbconexaostore_" division="store" />
      </main>
      <SharedFooter type="store" />
    </div>
  );
};

export default Store;
