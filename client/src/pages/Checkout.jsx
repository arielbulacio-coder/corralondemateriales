import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Truck, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [distance, setDistance] = useState(5);
    const [shippingCost, setShippingCost] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const calculateShipping = (dist) => {
        setDistance(dist);
        if (dist <= 10) {
            setShippingCost(0);
        } else {
            // 500 pesos per extra km after 10km
            setShippingCost((dist - 10) * 500);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        clearCart();
    };

    if (step === 3) {
        return (
            <div className="max-w-xl mx-auto px-4 py-24 text-center">
                <div className="flex justify-center mb-8">
                    <div className="bg-green-100 p-6 rounded-full">
                        <CheckCircle2 className="w-16 h-16 text-green-600" />
                    </div>
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">¡Pedido Recibido!</h2>
                <p className="text-lg text-slate-500 mb-10">
                    Gracias por confiar en Corralon de Materiales. Tu pedido está siendo procesado y nos comunicaremos con vos a la brevedad.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="btn-primary"
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-16">
                {/* Form */}
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Finalizar Compra</h1>
                        <p className="text-slate-500">Completá tus datos para coordinar el envío de los materiales.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <MapPin className="text-primary-600" /> Datos de Entrega
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Nombre Completo</label>
                                    <input required type="text" className="input-field" placeholder="Juan Perez" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Teléfono</label>
                                    <input required type="tel" className="input-field" placeholder="+54 9..." />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Dirección de Entrega</label>
                                <input required type="text" className="input-field" placeholder="Calle Falsa 123" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Truck className="text-primary-600" /> Cálculo de Flete
                            </h2>
                            <div className="bg-slate-100 p-6 rounded-xl">
                                <label className="block text-sm font-medium text-slate-700 mb-4 text-center">
                                    Simulá la distancia desde nuestro corralón: <br />
                                    <span className="text-2xl font-black text-primary-600">{distance} km</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={distance}
                                    onChange={(e) => calculateShipping(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <div className="flex justify-between mt-2 text-xs text-slate-400 font-bold">
                                    <span>CENTRO</span>
                                    <span>10 KM (GRATIS)</span>
                                    <span>50 KM</span>
                                </div>
                            </div>

                            {distance <= 10 ? (
                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3 text-green-700">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-semibold text-sm">¡Tu envío es GRATUITO por estar en el radio de 10km!</span>
                                </div>
                            ) : (
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center gap-3 text-blue-700">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-semibold text-sm">Costo de flete adicional: ${shippingCost.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-primary w-full py-4 text-xl flex items-center justify-center gap-3">
                            <CreditCard className="w-6 h-6" /> Confirmar Pedido
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="card bg-slate-900 border-none p-8 text-white sticky top-24">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            Resumen de Pedido
                        </h2>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-4 mb-8 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="bg-white/10 w-8 h-8 flex items-center justify-center rounded-lg font-bold">{item.quantity}x</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal Materiales</span>
                                <span className="font-semibold text-white">${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Costo de Flete</span>
                                <span className={`font-semibold ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                                    {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString()}`}
                                </span>
                            </div>
                            <div className="pt-6 flex justify-between items-end">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Total Final</span>
                                    <span className="text-4xl font-black text-primary-500">${(total + shippingCost).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
