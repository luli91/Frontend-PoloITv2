// src/config/sidebarConfig.js
const sidebarConfig = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        path: '/dashboard'
    },
    {
        label: 'Configuración',
        icon: 'pi pi-cog',
        key: 'configuracion',
        children: [
            { label: 'Perfil', icon: 'pi pi-user', path: '/dashboard/profile' },
            { label: 'Administración de usuarios', icon: 'pi pi-users', path: '/dashboard/user-admin' }
        ]
    },
    {
        label: 'Donaciones',
        icon: 'pi pi-heart',
        key: 'donaciones',
        path: '/dashboard/donations'

    }
];

export default sidebarConfig;