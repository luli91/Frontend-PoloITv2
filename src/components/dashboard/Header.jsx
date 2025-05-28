
// src/components/dashboard/Header.jsx
import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { handleLogout, user } = useAuth();
    const menuRef = useRef(null);

    const userMenuItems = [
        {
            label: 'Mi Perfil',
            icon: 'pi pi-user',
            command: () => {
                menuRef.current.hide();
                navigate('/dashboard/profile');
            }
        },
        {
            label: 'Cerrar Sesión',
            icon: 'pi pi-power-off',
            command: async () => {
                try {
                    menuRef.current.hide();
                    await handleLogout();
                    navigate('/login');
                } catch (error) {
                    console.error('Error al cerrar sesión:', error);
                }
            }
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <OverlayPanel ref={menuRef} dismissable>
                <div className="w-full min-w-[200px] p-3">
                    <div className="mb-3 border-bottom-1 surface-border">
                        <h6 className="text-lg font-semibold mb-2">{user?.nombre}</h6>
                        <p className="text-sm text-gray-600 mb-3">{user?.email}</p>
                    </div>
                    {userMenuItems.map((item, index) => (
                        <div
                            key={index}
                            className="p-2 hover:surface-100 border-round cursor-pointer flex align-items-center"
                            onClick={item.command}
                        >
                            <i className={`${item.icon} mr-2`}></i>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </OverlayPanel>

            <div
                className="flex align-items-center gap-2 cursor-pointer p-2"
                onClick={(e) => menuRef.current.toggle(e)}
            >
                <Avatar
                    label={`${user?.nombre?.[0] || ''}${user?.apellido?.[0] || ''}`}
                    shape="circle"
                    size="normal"
                    style={{ backgroundColor: '#2196F3', color: '#fff' }}
                />

                <span className="font-medium">{user?.nombre?.split(' ')[0] || 'Usuario'}</span>
                <i className="pi pi-angle-down"></i>
            </div>
        </div>
    );

    return (
        <Menubar
            model={[]}
            end={end}
            className="border-none px-4"
            pt={{
                root: { className: 'surface-0 shadow-none border-none' }
            }}
        />
    );
};

export default Header;


