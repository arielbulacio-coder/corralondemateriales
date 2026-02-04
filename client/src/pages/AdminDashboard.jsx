import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { Plus, Edit2, Trash2, Package, DollarSign, BarChart3, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await axios.get('/api/materials');
            setMaterials(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (material = null) => {
        if (material) {
            setEditingId(material.id);
            setFormData({
                name: material.name,
                description: material.description,
                price: material.price,
                stock: material.stock,
                category: material.category,
                image: material.image
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', description: '', price: '', stock: '', category: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/materials/${editingId}`, formData);
            } else {
                await axios.post('/api/materials', formData);
            }
            fetchMaterials();
            setIsModalOpen(false);
        } catch (err) {
            alert('Error saving material');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este material?')) {
            try {
                await axios.delete(`/api/materials/${id}`);
                fetchMaterials();
            } catch (err) {
                alert('Error deleting material');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Panel Administrativo</h1>
                    <p className="text-slate-500">Gestión de inventario, precios y existencias en tiempo real.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Nuevo Material
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="card p-6 bg-primary-50 border-primary-100 flex items-center gap-4">
                    <div className="bg-primary-600 p-3 rounded-lg text-white">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-primary-600 font-bold uppercase">Total Productos</p>
                        <p className="text-3xl font-black text-slate-900">{materials.length}</p>
                    </div>
                </div>
                <div className="card p-6 bg-slate-100 flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-lg text-white">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-bold uppercase">Categorías</p>
                        <p className="text-3xl font-black text-slate-900">
                            {[...new Set(materials.map(m => m.category))].length}
                        </p>
                    </div>
                </div>
                <div className="card p-6 bg-green-50 border-green-100 flex items-center gap-4">
                    <div className="bg-green-600 p-3 rounded-lg text-white">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-green-600 font-bold uppercase">Stock Crítico</p>
                        <p className="text-3xl font-black text-slate-900">
                            {materials.filter(m => m.stock < 10).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Materials Table */}
            <div className="card overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 font-bold text-slate-700">Material</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Categoría</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Precio</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Stock</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {materials.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={m.image} className="w-10 h-10 rounded object-cover" />
                                        <div>
                                            <p className="font-bold text-slate-900">{m.name}</p>
                                            <p className="text-xs text-slate-400 truncate max-w-[200px]">{m.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-600">{m.category}</span>
                                </td>
                                <td className="px-6 py-4 font-mono font-bold">${m.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${m.stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>
                                        {m.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleOpenModal(m)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold">{editingId ? 'Editar Material' : 'Nuevo Material'}</h2>
                                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
                                        <input required className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Precio</label>
                                        <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stock</label>
                                        <input required type="number" className="input-field" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categoría</label>
                                        <input required className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Ej: Áridos, Mampostería" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">URL Imagen</label>
                                        <input className="input-field" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
                                        <textarea className="input-field h-24 pt-2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                                    <Save className="w-5 h-5" /> {editingId ? 'Guardar Cambios' : 'Crear Producto'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
