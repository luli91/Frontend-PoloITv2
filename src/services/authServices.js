
import { api } from './apiServices.js';
import { API_CONFIG } from '../config/config';
import { store } from '../redux/store.js'; 
import { setAuthToken } from "../redux/slices/authSlice.js";

class AuthService {
    async login(credentials) {
    try {
        console.log("🔑 Iniciando login con:", credentials);

        // Verificar el contenido del payload antes de enviarlo
        console.log("📡 Payload enviado al backend:", JSON.stringify({
            email: credentials.email,
            password: credentials.password
        }, null, 2));

        const loginResponse = await api.post("/usuarios/login", {
    email: credentials.email,
    password: credentials.password
});

if (!loginResponse || !loginResponse.access_token) {
    throw new Error("⚠️ No se recibió token válido en la respuesta.");
}

console.log("✅ Token recibido:", loginResponse.access_token);

// ✅ Guarda el token ANTES de cualquier otra acción
localStorage.setItem("authToken", loginResponse.access_token);
store.dispatch(setAuthToken(loginResponse.access_token));

console.log("👤 Token guardado, ahora obteniendo el perfil...");
const userProfile = await this.getProfile();

localStorage.setItem("user", JSON.stringify(userProfile));
console.log("📌 User guardado en localStorage:", userProfile);

return { user: userProfile, token: loginResponse.access_token };

    } catch (error) {
        console.error("❌ Error en login:", error);
        throw error;
    }
}


    async getProfile() {
    try {
        console.log(" Obteniendo perfil del usuario...");

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("⚠️ No hay token disponible, no se puede obtener el perfil.");
        }

        const response = await api.get("/usuarios/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response) {
            throw new Error("❌ No se pudo obtener el perfil del usuario.");
        }

        console.log("✅ Perfil obtenido:", response);
        return response;
    } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
        throw error;
    }
    }

    async register(userData) {
        try {
            console.log('📝 Registrando nuevo usuario');
            console.log('Datos enviados:', userData);

            const dataToSend = {
                ...userData,
                rol: userData.rol || 'usuario'
            };

            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, dataToSend);

            // Si la respuesta tiene status 200, consideramos que fue exitoso
            if (response && response.id) {
                return {
                    success: true,
                    user: response
                };
            }

            throw new Error('Error en el registro de usuario');
        } catch (error) {
            console.error('Error en registro:', error);
            throw {
                success: false,
                message: error.message || 'Error en el registro',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }
    async updateProfile(userData) {
        try {
            console.log('✏️ Actualizando perfil');
            const response = await api.put(API_CONFIG.ENDPOINTS.USERS.UPDATE, userData);

            if (!response || !response.user) {
                throw new Error('Respuesta de actualización inválida');
            }

            return {
                user: response.user, // Mantenemos los datos completos del usuario
                message: response.message || 'Perfil actualizado exitosamente'
            };
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            throw {
                message: error.message || 'Error al actualizar el perfil',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async getProfile() {
        try {
            console.log('👤 Obteniendo perfil');
            const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);

            if (!response) {
                throw new Error('No se pudo obtener el perfil');
            }

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            throw {
                message: error.message || 'Error al obtener el perfil',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async getUsersList() {
        try {
            console.log('📋 Obteniendo lista de usuarios');
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.LIST);

            if (!response) {
                throw new Error('Formato de respuesta inválido');
            }

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            throw {
                message: error.message || 'Error al obtener la lista de usuarios',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async deleteUser(userId) {
        try {
            console.log('🗑️ Eliminando usuario:', userId);
            const response = await api.delete(`${API_CONFIG.ENDPOINTS.USERS.DELETE}/${userId}`);

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            throw {
                message: error.message || 'Error al eliminar usuario',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async verifyToken(token) {
        try {
            console.log('🔒 Verificando token');
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY, { token });

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error verificando token:', error);
            return {
                valid: false,
                message: error.message || 'Token inválido'
            };
        }
    }
}

export const authService = new AuthService();