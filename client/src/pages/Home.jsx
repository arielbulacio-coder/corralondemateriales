import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent" />
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000&auto=format&fit=crop"
                        alt="Construcción"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:max-w-2xl"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full">
                            Líderes en Materiales de Construcción
                        </span>
                        <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-8 leading-[1.1]">
                            Construí tus Sueños con <span className="text-primary-500">Calidad</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                            Arena, piedra, ladrillos y todo lo que necesitás para tu obra.
                            Envío <span className="text-white font-bold">Sin Cargo</span> en el primer radio de 10km.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/catalog" className="btn-primary flex items-center justify-center gap-2 text-lg">
                                Ver Catálogo <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/register" className="btn-secondary !bg-slate-800 !text-white !border-slate-700 hover:!bg-slate-700 flex items-center justify-center text-lg">
                                Crear Cuenta
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Truck, title: 'Entrega Veloz', desc: 'Despachamos en el día para que tu obra no se detenga.' },
                            { icon: ShieldCheck, title: 'Calidad Garantizada', desc: 'Materiales seleccionados de las mejores canteras y fábricas.' },
                            { icon: Clock, title: 'Soporte 24/7', desc: 'Estamos para asesorarte en cada paso de tu proyecto.' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-100"
                            >
                                <div className="bg-primary-100 p-4 rounded-xl mb-6 text-primary-600">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Delivery Banner */}
            <section className="bg-primary-600 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        ¿Tenés una obra cerca?
                    </h2>
                    <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                        Ofrecemos envío bonificado hasta 10km a la redonda de nuestro corralón.
                        Calandrá tu flete de forma automática en el checkout.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 rounded-full text-white font-semibold">
                        <Star className="w-5 h-5 fill-white" />
                        Más de 5000 obras entregadas con éxito
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
