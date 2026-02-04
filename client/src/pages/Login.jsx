import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas o error de conexión.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card max-w-md w-full p-10"
            >
                <div className="text-center mb-10">
                    <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Bienvenido</h2>
                    <p className="text-slate-500 mt-2">Ingresá a tu cuenta del Corralón</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm font-medium">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Email
                        </label>
                        <input
                            required
                            type="email"
                            className="input-field"
                            placeholder="admin@corralon.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Contraseña
                        </label>
                        <input
                            required
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-lg">
                        Iniciar Sesión
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500">
                    ¿No tenés cuenta? <Link to="/register" className="text-primary-600 font-bold hover:underline">Registrate aquí</Link>
                </p>

                <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-400">
                    <p className="font-bold mb-1 uppercase">Usuarios de prueba:</p>
                    <p>Admin: admin@corralon.com / admin123</p>
                    <p>Cliente: juan@gmail.com / user123</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
