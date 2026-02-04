import React from 'react';
import { HardHat, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-500 p-1.5 rounded-lg">
                                <HardHat className="text-white w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">
                                Corralon<span className="text-primary-500">Materiales</span>
                            </span>
                        </div>
                        <p className="text-slate-400">
                            Llevamos más de 20 años proveyendo los mejores materiales para las obras de nuestra región. Excelencia y compromiso en cada entrega.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors text-white">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors text-white">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Productos</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Áridos y Arena</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Ladrillos y Bloques</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Cementos y Cales</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Hierros y Perfiles</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">La Empresa</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Quiénes Somos</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Envíos</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contacto</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="text-primary-500 w-5 h-5 shrink-0" />
                                <span>Av. Libertador 4500, <br />Buenos Aires, Argentina</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="text-primary-500 w-5 h-5 shrink-0" />
                                <span>+54 11 4567-8900</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="text-primary-500 w-5 h-5 shrink-0" />
                                <span>contacto@corralon.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Corralon de Materiales S.A. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
