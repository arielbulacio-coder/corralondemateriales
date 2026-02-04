import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, HardHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                            <HardHat className="text-white w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            Corralon<span className="text-primary-600">Materiales</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/catalog" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Catalog</Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Admin Panel</Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                                    Hola, {user.name.split(' ')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 btn-primary !py-2 !px-4 text-sm">
                                <User className="w-4 h-4" />
                                Ingresar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
