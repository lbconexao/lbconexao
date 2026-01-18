import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSheetsApi } from '../googleSheetsApi';
import { Course } from '../types';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';

const Admin: React.FC = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        id: '', tipo: 'Online', imagem: '', categoria: '', titulo: '',
        descricao: '', preco: '', vagas: '', url: '', linhaOriginal: null as number | null
    });
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const coursesData = await googleSheetsApi.fetchCourses();
            setCourses(coursesData);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const savedUser = localStorage.getItem('lb_user');
            if (!savedUser) {
                navigate('/login');
            } else {
                setUser(JSON.parse(savedUser));
                fetchData();
            }
            setLoading(false);
        };

        checkUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('lb_user');
        navigate('/saude');
    };

    const handleOpenAdd = () => {
        setEditingCourse(null);
        setFormData({
            id: '', tipo: 'Online', imagem: '', categoria: '', titulo: '',
            descricao: '', preco: '', vagas: '', url: '', linhaOriginal: null
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            id: course.id,
            tipo: course.type,
            imagem: course.image,
            categoria: course.category,
            titulo: course.title,
            descricao: course.description,
            preco: course.price.toString(),
            vagas: (course.vagas || '').toString(),
            url: course.url || '',
            linhaOriginal: course.linhaOriginal || null
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (linha: number) => {
        if (!confirm('Tem certeza que deseja excluir este curso?')) return;
        setLoading(true);
        try {
            await googleSheetsApi.deleteCourse(linha);
            await fetchData();
            alert('Curso excluído com sucesso!');
        } catch (err) {
            alert('Erro ao excluir curso.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await googleSheetsApi.saveCourse({
                action: 'salvarCurso',
                linha: formData.linhaOriginal,
                id: formData.id,
                tipo: formData.tipo,
                imagem: formData.imagem,
                categoria: formData.categoria,
                titulo: formData.titulo,
                descricao: formData.descricao,
                preco: formData.preco,
                vagas: formData.vagas,
                url: formData.url
            });
            setIsModalOpen(false);
            await fetchData();
            alert('Curso salvo com sucesso!');
        } catch (err) {
            alert('Erro ao salvar curso.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-primary">Carregando...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <SharedHeader type="hub" />
            <main className="flex-grow bg-slate-50 py-12 px-4 md:px-10">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-primary tracking-tight">Painel Administrativo</h1>
                            <p className="text-slate-500 mt-2">Bem-vindo, {user?.email}. Gerencie cursos, produtos e promoções.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleLogout}
                                className="h-12 px-6 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span> Sair
                            </button>
                            <button
                                onClick={handleOpenAdd}
                                className="h-12 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-xl">add</span> ADICIONAR CURSOS
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { label: 'Cursos Ativos', value: courses.length.toString(), icon: 'school', color: 'text-health' },
                            { label: 'Produtos na Loja', value: products.length.toString(), icon: 'shopping_bag', color: 'text-store' },
                            { label: 'Leads de Contato', value: '8', icon: 'chat', color: 'text-primary' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                                <div className={`size-16 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                                    <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Management Tabs - Quick Implementation */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="border-b border-slate-100 flex overflow-x-auto">
                            {['Cursos (Saúde)', 'Produtos (Store)'].map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-8 py-5 text-sm font-bold whitespace-nowrap transition-all ${activeTab === i ? 'border-b-4 border-primary text-primary' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="p-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ID / Nome</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Categoria</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:cursor-help" title="Preço do Item">Preço</th>
                                        <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {activeTab === 0 ? (
                                        courses.map((course) => (
                                            <tr key={course.id} className="group hover:bg-slate-50/50 transition-all">
                                                <td className="py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-slate-400 font-mono">{course.id}</span>
                                                        <span className="font-bold text-slate-900">{course.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-slate-500">{course.category}</td>
                                                <td className="py-4 text-sm font-bold text-health">R$ {Number(course.price).toFixed(2)}</td>
                                                <td className="py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleOpenEdit(course)}
                                                        className="text-slate-400 hover:text-primary transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => course.linhaOriginal && handleDelete(course.linhaOriginal)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id} className="group hover:bg-slate-50/50 transition-all">
                                                <td className="py-4 font-bold text-slate-900">{product.name}</td>
                                                <td className="py-4 text-sm text-slate-500">{product.category}</td>
                                                <td className="py-4 text-sm font-bold text-store">R$ {Number(product.price).toFixed(2)}</td>
                                                <td className="py-4 text-right">
                                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {(activeTab === 0 ? courses : products).length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center text-slate-400 italic">
                                                Nenhum item encontrado no banco de dados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Course Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-2xl font-black text-primary">
                                    {editingCourse ? 'Editar Curso' : 'Novo Curso'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="size-10 rounded-full hover:bg-slate-100 transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">ID (Auto-gerado se novo)</label>
                                        <input
                                            type="text"
                                            disabled={!editingCourse}
                                            value={formData.id}
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all bg-slate-50 disabled:opacity-75 cursor-not-allowed"
                                            placeholder="Automático"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo</label>
                                        <select
                                            value={formData.tipo}
                                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        >
                                            <option value="Online">Online</option>
                                            <option value="Presencial">Presencial</option>
                                            <option value="Híbrido">Híbrido</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Título do Curso</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.titulo}
                                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.categoria}
                                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preço (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.preco}
                                            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qtd Vagas</label>
                                        <input
                                            type="number"
                                            value={formData.vagas}
                                            onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">URL da Imagem</label>
                                        <input
                                            type="url"
                                            required
                                            value={formData.imagem}
                                            onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">URL de Inscrição</label>
                                        <input
                                            type="url"
                                            required
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Descrição</label>
                                        <textarea
                                            required
                                            value={formData.descricao}
                                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                            className="w-full h-32 rounded-xl border-slate-200 focus:ring-primary focus:border-primary p-4 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                >
                                    {loading ? 'Salvando...' : (editingCourse ? 'Atualizar Curso' : 'SALVAR CURSO')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <SharedFooter />
        </div>
    );
};

export default Admin;
