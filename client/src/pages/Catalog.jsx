import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, Filter, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/materials');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Nuestro Catálogo</h1>
                    <p className="text-slate-500">Todo lo que necesitás para tu construcción de principio a fin.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar materiales..."
                        className="input-field pl-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence>
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={product.id}
                            className="card flex flex-col"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-xs font-bold text-primary-600">
                                    {product.category}
                                </span>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-slate-900">${product.price.toLocaleString()}</span>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">IVA Incluido</span>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 active:scale-90"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-slate-400">No se encontraron productos con ese nombre.</p>
                </div>
            )}
        </div>
    );
};

export default Catalog;
