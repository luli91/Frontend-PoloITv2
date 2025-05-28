/*
// src/layouts/DashboardLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
    const location = useLocation();
    const getPageTitle = () => {
        const paths = {
            '/dashboard': 'Dashboard',
            '/dashboard/profile': 'Perfil',
            '/dashboard/settings': 'Configuración'
        };
        return paths[location.pathname] || 'Dashboard';
    };

    return (
        <div className="min-h-screen bg-slate-100"> {/!* Cambiado a slate-100 para más visibilidad *!/}
            <Header />

            <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-slate-200"> {/!* Ajustado el gradiente *!/}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex gap-6">
                        <Sidebar />

                        <main className="flex-1">
                            {/!* Contenedor del título *!/}
                            <div className="bg-white rounded-xl shadow-md mb-6 p-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {getPageTitle()}
                                </h2>
                            </div>

                            {/!* Contenedor del contenido *!/}
                            <div className="bg-white rounded-xl shadow-md">
                                <div className="p-6">
                                    <Outlet />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

*/

// src/layouts/DashboardLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
    const location = useLocation();

    const getPageTitle = () => {
        const paths = {
            '/dashboard': 'Dashboard',
            '/dashboard/profile': 'Perfil',
            '/dashboard/settings': 'Configuración',
            '/dashboard/user-admin': 'Administracion de usuarios',
            '/dashboard/donations': 'Donaciones'

        };
        return paths[location.pathname] || 'Dashboard';
    };

    return (
        <div className="layout-wrapper">
            <div className="layout-sidebar">
                <Sidebar />
            </div>
            <div className="layout-main-container">
                <div className="layout-topbar">
                    <Header />
                </div>
                <div className="layout-content">
                    <div className="card mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {getPageTitle()}
                        </h2>
                    </div>
                    <div className="card">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;