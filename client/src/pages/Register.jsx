import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/api';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar usuario. El email podría estar en uso.');
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
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Crear Cuenta</h2>
                    <p className="text-slate-500 mt-2">Unite a nuestra comunidad de constructores</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm font-medium">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                            <User className="w-4 h-4" /> Nombre
                        </label>
                        <input
                            required
                            type="text"
                            className="input-field"
                            placeholder="Juan Perez"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Email
                        </label>
                        <input
                            required
                            type="email"
                            className="input-field"
                            placeholder="juan@gmail.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-lg">
                        Registrarse
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500">
                    ¿Ya tenés cuenta? <Link to="/login" className="text-primary-600 font-bold hover:underline">Iniciá sesión</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
