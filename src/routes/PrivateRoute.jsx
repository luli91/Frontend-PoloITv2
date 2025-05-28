import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user } = useAuth();

    // Si no hay usuario autenticado, redirige al login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si hay usuario autenticado, permite acceder a la ruta protegida
    return children;
}