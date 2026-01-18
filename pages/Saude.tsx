import React, { useState, useEffect } from 'react';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import InstagramFeed from '../components/InstagramFeed';
import { IMAGES } from '../constants';
import { Course } from '../types';
import { googleSheetsApi } from '../googleSheetsApi';

const Saude: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await googleSheetsApi.fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Bloquear scroll do corpo quando o modal estiver aberto
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCourse]);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course as Course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };
  return (
    <div id="top" className="flex flex-col min-h-screen scroll-smooth">
      <SharedHeader type="saude" />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-primary text-4xl md:text-6xl font-black leading-tight tracking-tight">
                Transformando a <span className="text-health">Educação</span> em Saúde
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                Capacitação profissional de excelência para o mercado de saúde. Cursos, workshops e eventos exclusivos para o seu crescimento.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 px-8 bg-health text-white font-bold rounded-lg shadow-lg hover:shadow-health/20 transition-all active:scale-95"
                >
                  Explorar Cursos
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMAGES.HEALTH_BANNER} alt="Saúde" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="bg-primary py-10">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-health text-3xl font-black">+5.000</p>
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1">Alunos Formados</p>
            </div>
            <div>
              <p className="text-health text-3xl font-black">120</p>
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1">Cursos Ativos</p>
            </div>
            <div>
              <p className="text-health text-3xl font-black">98%</p>
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1">Satisfação</p>
            </div>
            <div>
              <p className="text-health text-3xl font-black">24h</p>
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mt-1">Suporte Online</p>
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <section id="cursos" className="py-20 bg-slate-50 scroll-mt-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
              <span className="text-health font-bold uppercase tracking-[0.2em] text-xs">Educação Continuada</span>
              <h2 className="text-primary text-3xl md:text-4xl font-black mt-2">Nossos Cursos em Destaque</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white ${course.type?.toUpperCase() === 'ONLINE' ? 'bg-blue-900 shadow-lg shadow-blue-900/20' :
                        course.type?.toUpperCase() === 'HÍBRIDO' || course.type?.toUpperCase() === 'HIBRIDO' ? 'bg-red-600 shadow-lg shadow-red-600/20' :
                          'bg-health shadow-lg shadow-health/20'
                      }`}>
                      {course.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-health text-lg">school</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{course.category}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-300">{course.id}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{course.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6">{course.description}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-lg font-black text-primary">R$ {course.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleCourseClick(course)}
                        className="text-health font-bold text-sm hover:underline flex items-center gap-1"
                      >
                        Ver Detalhes <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Detail Modal */}
        {selectedCourse && (
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
                <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-health text-lg">school</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedCourse.category}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">{selectedCourse.id}</span>
                </div>
                <h2 className="text-3xl font-black text-primary mb-4 leading-tight">{selectedCourse.title}</h2>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-black text-primary">R$ {selectedCourse.price.toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white ${selectedCourse.type?.toUpperCase() === 'ONLINE' ? 'bg-blue-900' :
                      selectedCourse.type?.toUpperCase() === 'HÍBRIDO' || selectedCourse.type?.toUpperCase() === 'HIBRIDO' ? 'bg-red-600' :
                        'bg-health'
                    }`}>
                    {selectedCourse.type}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sobre o Curso</h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {selectedCourse.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-health">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {selectedCourse.vagas ? `${selectedCourse.vagas} vagas disponíveis` : 'Vagas limitadas disponíveis'}
                  </div>
                  <a
                    href={selectedCourse.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 bg-health text-white font-black rounded-2xl shadow-xl shadow-health/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined">shopping_cart</span> Inscrever-se Agora
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instagram Integration */}
        <InstagramFeed handle="lbconexaosaude" division="saude" />
      </main>
      <SharedFooter type="saude" />
    </div>
  );
};

export default Saude;
