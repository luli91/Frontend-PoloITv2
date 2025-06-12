
import { createContext, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logout } from "../redux/slices/authSlice";
import { authService } from "../services/authServices.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const handleLogin = useCallback(async (email, password) => {
        try {
            const response = await dispatch(loginUser({ email, password })).unwrap();
            if (response.token && response.user) {
                return { ok: true };
            }
            return {
                ok: false,
                error: "Credenciales inválidas"
            };
        } catch (error) {
            console.error("Error en login:", error);
            return {
                ok: false,
                error: error.detail || error.message || "Error al iniciar sesión"
            };
        }
    }, [dispatch]);


    const handleRegister = useCallback(async (userData) => {
        try {
            const response = await authService.register(userData);

            if (response.success && response.user) {
                return {
                    ok: true,
                    message: "Usuario registrado exitosamente"
                };
            }

            // Si hay un error, devolvemos el mensaje detallado
            return {
                ok: false,
                error: response.detail || response.message || "Error en el registro"
            };

        } catch (error) {
            console.error("Error en registro:", error);
            // Propagamos el mensaje detallado del error
            return {
                ok: false,
                error: error.detail || error.message || "Error en el registro"
            };
        }
    }, []);


    const handleUpdateProfile = useCallback(async (userData) => {
        try {
            const response = await authService.updateProfile(userData);

            if (response.user) {
                dispatch(login({
                    user: response.user,
                    token // Mantener el token actual
                }));
                return { ok: true };
            }
            return {
                ok: false,
                error: "Error al actualizar perfil"
            };
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            return {
                ok: false,
                error: error.message || "Error al actualizar perfil"
            };
        }
    }, [dispatch, token]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const checkAuth = useCallback(async () => {
        try {
            if (token) {
                const userData = await authService.getProfile();
                if (userData) {
                    dispatch(login({
                        user: userData,
                        token
                    }));
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error verificando autenticación:", error);
            handleLogout();
            return false;
        }
    }, [dispatch, token, handleLogout]);

    const contextValue = {
        user,
        token,
        isAuthenticated: !!token,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateProfile,
        checkAuth
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};