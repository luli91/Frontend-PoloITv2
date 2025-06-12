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