import { useEffect, useState } from "react";
import { createContext, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logout, setAuthToken } from "../redux/slices/authSlice";
import { authService } from "../services/authServices.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
        const userRedux = useSelector((state) => state.auth.user); 
        const tokenRedux = useSelector((state) => state.auth.token);
        const dispatch = useDispatch();

        const storedToken = localStorage.getItem("authToken");
        const storedUser = JSON.parse(localStorage.getItem("user")) || null;

        const [user, setUser] = useState(storedUser || userRedux);
        const [token, setToken] = useState(storedToken || tokenRedux);

        useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && !user) {
        console.log("🔄 Restaurando sesión desde localStorage...");
        setToken(storedToken);
        setUser(storedUser);
        dispatch(setAuthToken(storedToken));
        dispatch(setUser(storedUser));
    }

    // Solo ejecuta checkAuth() si el usuario aún no está definido
    if (!storedUser && storedToken) {
        checkAuth();
    }
}, [user, dispatch]);

    const handleLogin = useCallback(async (email, password) => {
    try {
        const response = await dispatch(loginUser({ email, password })).unwrap();

        if (!response || !response.token) {
            throw new Error("⚠️ No se recibió token válido en la respuesta del login.");
        }

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        console.log("🔐 Token recibido en AuthContext:", response.token);
        console.log("👤 Usuario recibido en AuthContext:", response.user);

        return { ok: true };
    } catch (error) {
        console.error("❌ Error en login:", error);
        return {
            ok: false,
            error: error.detail || error.message || "Error al iniciar sesión"
        };
    }
}, [dispatch]);


    const handleLogout = useCallback(() => {
        dispatch(logout());
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    }, [dispatch]);

    const checkAuth = useCallback(async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.warn("⚠️ No hay token disponible, cerrando sesión.");
            handleLogout();
            return false;
        }

        console.log("🔎 Verificando autenticación con token:", token);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setToken(token);

            dispatch(setAuthToken(token)); 
            dispatch(setUser(storedUser)); 
            
            console.log("✅ Usuario restaurado desde localStorage:", storedUser);
            return true;
        }

        console.warn("⚠️ No se encontró usuario en localStorage, haciendo nueva solicitud...");
        const userData = await authService.getProfile();
        
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setToken(token);

            dispatch(setAuthToken(token));
            dispatch(setUser(userData));
            
            console.log("✅ Usuario restaurado desde API:", userData);
            return true;
        }

        return false;
    } catch (error) {
        console.error("❌ Error verificando autenticación:", error);
        handleLogout();
        return false;
    }
}, [dispatch, handleLogout]);


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
                token: tokenRedux // 🔥 Usamos `tokenRedux`, que sí está definido
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
}, [dispatch, tokenRedux]); 


    const contextValue = {
        user: storedUser || userRedux,
        token: storedToken || tokenRedux,
        isAuthenticated: !!(storedToken || tokenRedux),
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateProfile,
        checkAuth
    };
        console.log("🔎 Estado de autenticación en AuthContext:", contextValue.isAuthenticated);
        console.log("👤 Datos del usuario en AuthContext:", contextValue.user);
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