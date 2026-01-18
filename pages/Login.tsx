import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSheetsApi } from '../googleSheetsApi';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const data = await googleSheetsApi.login(email, password);
            if (data.success) {
                localStorage.setItem('lb_user', JSON.stringify({ email }));
                navigate('/admin');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const data = await googleSheetsApi.register({
                usuario: email,
                senha: password,
                confirma: confirmPassword
            });
            if (data.success) {
                setSuccessMessage(data.message);
                setIsRegistering(false);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao processar registro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SharedHeader type="hub" />
            <main className="flex-grow flex items-center justify-center bg-slate-50 py-20 px-4">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-primary mb-2">
                            {isRegistering ? 'Criar Conta' : 'Acesso Administrativo'}
                        </h1>
                        <p className="text-slate-500 text-sm">
                            {isRegistering
                                ? 'Preencha os dados para solicitar acesso ao painel.'
                                : 'Entre com suas credenciais para gerenciar a plataforma.'}
                        </p>
                    </div>

                    <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Usuário / E-mail</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                placeholder="seu usuário ou email"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {isRegistering && (
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Confirmar Senha</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="p-4 bg-green-50 text-green-600 text-sm rounded-xl border border-green-100">
                                {successMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? 'Processando...' : (isRegistering ? 'Cadastrar' : 'Entrar')}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsRegistering(!isRegistering);
                                    setError(null);
                                    setSuccessMessage(null);
                                }}
                                className="text-sm font-bold text-primary hover:underline"
                            >
                                {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Solicite acesso'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <SharedFooter />
        </div>
    );
};

export default Login;
