import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    return user || storedUser ? children : <Navigate to="/login" />;
};

export default UserRoute;
