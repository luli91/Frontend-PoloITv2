import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import logo from "../../public/ReDoná_logo.png";

const NavBar = () => {
    const menuRef = React.useRef(null);
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const userMenuItems = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => navigate('/perfil')
        },
        {
            label: 'Mis Donaciones',
            icon: 'pi pi-gift',
            command: () => navigate('/mis-donaciones')
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-power-off',
            command: handleLogout
        }
    ];

    const toggleMenu = (event) => {
        menuRef.current.toggle(event);
    };

    return (
        <nav className="bg-[#A20A0A] shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-20"
                        />
                    </Link>

                    {/* Menú de navegación */}
                    <div className="flex-1 flex justify-center space-x-4">
                        <Link
                            to="/donaciones"
                            className="text-white hover:bg-[#8a0909] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Donaciones
                        </Link>

                        {user?.role === "admin" && (
                            <Link
                                to="/publicaciones"
                                className="text-white hover:bg-[#8a0909] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Administrar Publicaciones
                            </Link>
                        )}

                        <Link
                            to="/sobre-nosotros"
                            className="text-white hover:bg-[#8a0909] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Sobre Nosotros
                        </Link>
                    </div>

                    {/* Menú del usuario */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="relative">
                                <Button
                                    icon="pi pi-user"
                                    onClick={toggleMenu}
                                    className="p-button-rounded p-button-text p-button-white"
                                    aria-label="Menu de usuario"
                                />
                                <Menu
                                    model={userMenuItems}
                                    popup
                                    ref={menuRef}
                                    className="mt-2"
                                />
                            </div>
                        ) : (
                            <Button
                                label="Iniciar sesión"
                                icon="pi pi-sign-in"
                                onClick={() => navigate("/login")}
                                className="p-button-text p-button-white"
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;