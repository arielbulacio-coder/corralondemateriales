import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingBag className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Tu carrito está vacío</h2>
                <p className="text-slate-500 mb-10">Parece que aún no has agregado materiales a tu pedido.</p>
                <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
                    Volver al Catálogo <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center sm:text-left">Mi Pedido</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="card p-6 flex items-center gap-6">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-slate-900">{item.name}</h3>
                                <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-slate-200 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 px-3 hover:bg-slate-50 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 px-3 hover:bg-slate-50 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-black text-xl">${(item.price * item.quantity).toLocaleString()}</span>
                                <span className="text-xs text-slate-400">${item.price.toLocaleString()} c/u</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="card p-8 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Resumen de Compra</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Envío</span>
                                <span className="text-primary-600 font-semibold italic text-sm">Se calcula en el checkout</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between">
                                <span className="text-lg font-bold text-slate-900">Total aprox.</span>
                                <span className="text-2xl font-black text-primary-600">${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                            Continuar al Checkout <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="mt-6 text-xs text-slate-400 text-center">
                            * El costo final del flete se determinará según la distancia exacta ingresada en el siguiente paso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
