// src/pages/dashboard/DashboardProfile.jsx
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const DashboardProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const userName = user?.nombre?.split(' ')[0] || 'Usuario';

    const handleEditProfile = () => {
        navigate('/editar-perfil');
    };

    const formatRole = (role) => {
        return role ? role.charAt(0).toUpperCase() + role.slice(1) : "No disponible";
    };

    return (
        <div className="p-4 space-y-6">
            <Card title="Información Personal" className="shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <strong>Nombre:</strong>
                        <p>{user?.nombre || 'No disponible'}</p>
                    </div>
                    <div>
                        <strong>Email:</strong>
                        <p>{user?.email || 'No disponible'}</p>
                    </div>
                    <div>
                        <strong>Teléfono:</strong>
                        <p>{user?.telefono || 'No disponible'}</p>
                    </div>
                    <div>
                        <strong>Rol:</strong>
                        <p>{formatRole(user?.rol)}</p>
                    </div>
                </div>
                <Divider />
   {/*             <Button
                    label="Modificar Datos"
                    icon="pi pi-user-edit"
                    className="mt-3 px-4"
                    onClick={handleEditProfile}
                />*/}

            </Card>
            <br/>
            <Card title="Ubicación" className="shadow-md">
                {user?.ubicacion ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <strong>Dirección:</strong>
                            <p>{user.ubicacion.direccion}</p>
                        </div>
                        <div>
                            <strong>Ciudad:</strong>
                            <p>{user.ubicacion.ciudad}</p>
                        </div>
                        <div>
                            <strong>Código Postal:</strong>
                            <p>{user.ubicacion.codigo_postal}</p>
                        </div>
                        <div>
                            <strong>Provincia:</strong>
                            <p>{user.ubicacion.provincia}</p>
                        </div>
                            <Divider />

                            <Button
                                label="Editar Ubicación"
                                icon="pi pi-map-marker"
                                className="mt-3 px-4"
                                severity="secondary"
                                onClick={handleEditProfile}
                            />
                    </div>
                ) : (
                    <div className="text-gray-700">
                        <p>Sin ubicación registrada.</p>
                        <Button
                            label="Agregar Ubicación"
                            icon="pi pi-plus"
                            className="w-full mt-3"
                            severity="secondary"
                            onClick={handleEditProfile}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DashboardProfile;
