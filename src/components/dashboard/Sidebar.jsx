/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import redonaLogo from '../../assets/redona_logo.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [expandedKeys, setExpandedKeys] = useState({});
    const [activeItemKey, setActiveItemKey] = useState('');

    useEffect(() => {
        // Determinar ítem activo y grupo expandido según la ruta actual
        if (location.pathname === '/dashboard') {
            setActiveItemKey('dashboard');
            setExpandedKeys({});
        } else if (location.pathname.startsWith('/dashboard/profile')) {
            setActiveItemKey('profile');
            setExpandedKeys({ configuracion: true });
        } else if (location.pathname.startsWith('/dashboard/user-admin')) {
            setActiveItemKey('user-admin');
            setExpandedKeys({ configuracion: true });
        } else if (location.pathname.startsWith('/dashboard/donaciones/crear')) {
            setActiveItemKey('crear-donacion');
            setExpandedKeys({ donaciones: true });
        } else if (location.pathname.startsWith('/dashboard/donaciones')) {
            setActiveItemKey('ver-donaciones');
            setExpandedKeys({ donaciones: true });
        }
    }, [location.pathname]);

    const handleSelect = (key, path, parentKey = null) => {
        setActiveItemKey(key);
        navigate(path);

        // Expand solo el grupo correspondiente y colapsar el resto
        if (parentKey) {
            setExpandedKeys({ [parentKey]: true });
        } else {
            setExpandedKeys({});
        }
    };

    const menuItems = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: 'pi pi-home',
            className: activeItemKey === 'dashboard' ? 'bg-blue-50 text-blue-700 font-semibold' : '',
            command: () => handleSelect('dashboard', '/dashboard')
        },
        {
            key: 'configuracion',
            label: 'Configuración',
            icon: 'pi pi-cog',
            items: [
                {
                    key: 'profile',
                    label: 'Perfil',
                    icon: 'pi pi-user',
                    className: activeItemKey === 'profile' ? 'bg-blue-50 text-blue-700 font-semibold' : '',
                    command: () => handleSelect('profile', '/dashboard/profile', 'configuracion')
                },
                {
                    key: 'user-admin',
                    label: 'Administración de usuarios',
                    icon: 'pi pi-users',
                    className: activeItemKey === 'user-admin' ? 'bg-blue-50 text-blue-700 font-semibold' : '',
                    command: () => handleSelect('user-admin', '/dashboard/user-admin', 'configuracion')
                }
            ]
        },
        {
            key: 'donaciones',
            label: 'Donaciones',
            icon: 'pi pi-heart',
            items: [
                {
                    key: 'crear-donacion',
                    label: 'Crear Donación',
                    icon: 'pi pi-plus',
                    className: activeItemKey === 'crear-donacion' ? 'bg-blue-50 text-blue-700 font-semibold' : '',
                    command: () => handleSelect('crear-donacion', '/dashboard/donaciones/crear', 'donaciones')
                },
                {
                    key: 'ver-donaciones',
                    label: 'Ver Donaciones',
                    icon: 'pi pi-list',
                    className: activeItemKey === 'ver-donaciones' ? 'bg-blue-50 text-blue-700 font-semibold' : '',
                    command: () => handleSelect('ver-donaciones', '/dashboard/donaciones', 'donaciones')
                }
            ]
        }
    ];

    return (
        <div className="flex flex-column h-screen bg-white border-r border-gray-200 shadow-sm">
            {/!* Logo *!/}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <img src={redonaLogo} alt="Logo" className="h-6 w-auto" />
                <span className="text-lg font-semibold text-gray-700 hidden md:inline">PoloIT</span>
            </div>

            {/!* Menú *!/}
            <div className="p-3 flex-1 overflow-y-auto">
                <PanelMenu
                    model={menuItems}
                    className="w-full"
                    expandedKeys={expandedKeys}
                    onExpandedKeysChange={(e) => setExpandedKeys(e.value)}
                />
            </div>
        </div>
    );
};

export default Sidebar;
*/
/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import redonaLogo from '../../assets/redona_logo.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeIndex, setActiveIndex] = useState(null);

    const isActive = (path) => location.pathname.startsWith(path);

    useEffect(() => {
        if (location.pathname.startsWith('/dashboard/profile') || location.pathname.startsWith('/dashboard/user-admin')) {
            setActiveIndex(0); // Configuración
        } else if (location.pathname.startsWith('/dashboard/donations')) {
            setActiveIndex(1); // Donaciones
        } else {
            setActiveIndex(null); // Dashboard
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-column h-screen bg-white border-r border-gray-200 shadow-sm">
            {/!* Logo *!/}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <img src={redonaLogo} alt="Logo" className="h-6 w-auto" />
                <span className="text-lg font-semibold text-gray-700 hidden md:inline">PoloIT</span>
            </div>

            {/!* Menú *!/}
            <div className="p-3 flex-1 overflow-y-auto">
                {/!* Dashboard - Estilo visual uniforme *!/}
                <div className="mb-3 border border-gray-200 rounded-lg">
                    <div
                        className={`cursor-pointer p-3 flex items-center gap-2 rounded-t-lg transition-colors ${
                            isActive('/dashboard') ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                            navigate('/dashboard');
                            setActiveIndex(null);
                        }}
                    >
                        <i className="pi pi-home"></i>
                        <span>Dashboard</span>
                    </div>
                </div>

                {/!* Accordion para otras secciones *!/}
                <Accordion
                    multiple={false}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <AccordionTab
                        header={
                            <div className="flex items-center gap-2">
                                <i className="pi pi-cog"></i>
                                <span>Configuración</span>
                            </div>
                        }
                    >
                        <div
                            className={`cursor-pointer p-2 mb-2 rounded hover:bg-gray-100 transition-colors ${
                                isActive('/dashboard/profile') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                                navigate('/dashboard/profile');
                                setActiveIndex(0);
                            }}
                        >
                            <i className="pi pi-user mr-2"></i> Perfil
                        </div>
                        <div
                            className={`cursor-pointer p-2 mb-2 rounded hover:bg-gray-100 transition-colors ${
                                isActive('/dashboard/user-admin') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                                navigate('/dashboard/user-admin');
                                setActiveIndex(0);
                            }}
                        >
                            <i className="pi pi-users mr-2"></i> Administración de usuarios
                        </div>
                    </AccordionTab>

                    <AccordionTab
                        header={
                            <div className="flex items-center gap-2">
                                <i className="pi pi-gift"></i>
                                <span>Donaciones</span>
                            </div>
                        }
                    >
                        <div
                            className={`cursor-pointer p-2 mb-2 rounded hover:bg-gray-100 transition-colors ${
                                isActive('/dashboard/donations/create') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                                navigate('/dashboard/donations/create');
                                setActiveIndex(1);
                            }}
                        >
                            <i className="pi pi-plus mr-2"></i> Crear donaciones
                        </div>
                        <div
                            className={`cursor-pointer p-2 mb-2 rounded hover:bg-gray-100 transition-colors ${
                                isActive('/dashboard/donations') && !location.pathname.endsWith('/create') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                            onClick={() => {
                                navigate('/dashboard/donations');
                                setActiveIndex(1);
                            }}
                        >
                            <i className="pi pi-eye mr-2"></i> Ver donaciones
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
*/

// src/components/dashboard/Sidebar.jsx

import React, { useState } from 'react';
import sidebarConfig from '../../config/sidebarConfig';
import SidebarSection from './SidebarSection';
import redonaLogo from '../../assets/redona_logo.png';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="w-[240px] h-screen flex flex-col bg-white border-r border-gray-200 shadow-sm">
            {/* Menú */}
            <div className="flex-1 overflow-y-auto p-3">
                <div className="flex justify-center items-center px-4 py-4 border-b border-gray-100">
                    <img src={redonaLogo} alt="Logo" className="h-8 w-auto object-contain" />
                </div>

                {sidebarConfig.map((item, index) => (
                    <SidebarSection
                        key={item.label}
                        item={item}
                        activeIndex={activeIndex === index ? 0 : null}
                        onTabChange={() => setActiveIndex(activeIndex === index ? null : index)}
                    />
                ))}

            </div>

        </div>

    );
};

export default Sidebar;

