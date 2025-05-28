import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userData = user || storedUser;

    if (!userData || userData.rol !== "admin") {
        console.warn("🔒 Acceso denegado. Rol requerido: admin.");
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminRoute;

