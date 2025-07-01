import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { token } = useAuth();  

    // Si no hay token, redirige al login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si hay un token válido, permite el acceso
    return children;
}