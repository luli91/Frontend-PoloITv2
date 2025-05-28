import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="w-full bg-[#799351] text-gray-800 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Redes sociales */}
                <div className="flex justify-center gap-4 mb-4">
                    <a href="#" className="p-3 hover:bg-[#8aa562] rounded-full transition-colors">
                        <i className="pi pi-instagram text-2xl"></i>
                    </a>
                    <a href="#" className="p-3 hover:bg-[#8aa562] rounded-full transition-colors">
                        <i className="pi pi-linkedin text-2xl"></i>
                    </a>
                    <a href="#" className="p-3 hover:bg-[#8aa562] rounded-full transition-colors">
                        <i className="pi pi-twitter text-2xl"></i>
                    </a>
                </div>

                {/* Divisor */}
                <div className="h-px bg-gray-700 mb-8"></div>

                {/* Estructura principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Navegación */}
                    <div>
                        <h6 className="text-xl font-bold mb-4">Navegación</h6>
                        <nav className="flex flex-col gap-2">
                            <Link to="/" className="py-2 hover:bg-[#8aa562] rounded px-3 transition-colors">
                                Inicio
                            </Link>
                            <Link to="/donaciones" className="py-2 hover:bg-[#8aa562] rounded px-3 transition-colors">
                                Donaciones
                            </Link>
                            <Link to="/sobre-nosotros" className="py-2 hover:bg-[#8aa562] rounded px-3 transition-colors">
                                Sobre Nosotros
                            </Link>
                            <Link to="/preguntas-frecuentes" className="py-2 hover:bg-[#8aa562] rounded px-3 transition-colors">
                                Preguntas Frecuentes
                            </Link>
                            <Link to="/contacto" className="py-2 hover:bg-[#8aa562] rounded px-3 transition-colors">
                                Contacto
                            </Link>
                        </nav>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h6 className="text-xl font-bold mb-4">Contacto</h6>
                        <p className="text-sm mb-4">
                            Si quieres recibir novedades, suscríbete a nuestro boletín.
                        </p>
                        <div className="flex gap-2">
                            <InputText
                                placeholder="Tu correo"
                                className="w-full bg-white rounded"
                            />
                            <Button
                                icon="pi pi-send"
                                className="p-button-raised bg-gray-800 hover:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Derechos reservados */}
                <div className="text-center mt-8">
                    <p className="text-sm">© 2025 PoloIT. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}