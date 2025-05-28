export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Perfil de Usuario
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Nombre
                            </h3>
                            <p className="mt-1 text-lg text-gray-900">
                                {user.nombre}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Correo electrónico
                            </h3>
                            <p className="mt-1 text-lg text-gray-900">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            label="Editar Perfil"
                            icon="pi pi-user-edit"
                            className="w-full"
                            onClick={() => {/* tu lógica */}}
                        />

                        <Button
                            label="Cambiar Contraseña"
                            icon="pi pi-lock"
                            className="w-full p-button-secondary"
                            onClick={() => {/* tu lógica */}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}