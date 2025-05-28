import { useEffect } from "react";
import { useSelector } from "react-redux";
// Si usás Context API en vez de Redux, importá desde tu AuthContext
// import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
    // Desde Redux
    const user = useSelector((state) => state.auth.user);

    // Simulador si no hay usuario (dev mode)
    const displayName = user?.name || "Usuario";

    useEffect(() => {
        document.title = "Dashboard | Portal";
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Hola, {displayName}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card ejemplo */}
                <div className="bg-white shadow-md rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Donaciones realizadas</h2>
                    <p className="text-3xl font-bold text-indigo-600">12</p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Última donación</h2>
                    <p className="text-gray-600">10 mayo 2025</p>
                </div>

                <div className="bg-white shadow-md rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Estado de cuenta</h2>
                    <p className="text-green-600 font-medium">Al día</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Actividades recientes</h2>
                <ul className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
                    <li className="p-4">✅ Donación a Fundación Redona - $2.000</li>
                    <li className="p-4">🔄 Actualizaste tus datos personales</li>
                    <li className="p-4">📥 Descargaste el comprobante</li>
                </ul>
            </div>
        </div>
    );
}
