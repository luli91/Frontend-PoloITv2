import { api } from './apiServices.js';
import { API_CONFIG } from '../config/config';
import { store } from '../redux/store.js';
import { setAuthToken } from "../redux/slices/authSlice.js";

const DEBUG_MODE = false;

class AuthService {
    async login({ email, password }) {
        try {
            if (DEBUG_MODE) {
                console.log("🔑 Login con:", { email, password });
            }

            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });

            if (!response?.access_token) {
                throw new Error("No se recibió un token válido.");
            }

            const token = response.access_token;
            localStorage.setItem("authToken", token);
            store.dispatch(setAuthToken(token));

            const user = await this.getProfile();
            localStorage.setItem("user", JSON.stringify(user));

            return { token, user };
        } catch (error) {
            console.error("❌ Error en login:", error);
            throw this._wrapError(error, "login");
        }
    }

    async register(userData) {
        try {
            const payload = { ...userData, rol: userData.rol || 'usuario' };
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, payload);

            if (!response?.id) throw new Error('Registro inválido');

            return { success: true, user: response };
        } catch (error) {
            console.error("❌ Error en registro:", error);
            throw this._wrapError(error, "registro");
        }
    }

    async getProfile() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
            if (!response) throw new Error("No se pudo obtener el perfil.");
            return response;
        } catch (error) {
            console.error("❌ Error obteniendo perfil:", error);
            throw this._wrapError(error, "perfil");
        }
    }

    async updateProfile(userData) {
        try {
            const response = await api.put(API_CONFIG.ENDPOINTS.USERS.UPDATE, userData);
            if (!response?.user) throw new Error("Respuesta inválida al actualizar.");

            return {
                user: response.user,
                message: response.message || "Perfil actualizado exitosamente"
            };
        } catch (error) {
            console.error("❌ Error actualizando perfil:", error);
            throw this._wrapError(error, "actualización de perfil");
        }
    }

    async getUsersList() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.LIST);
            if (!response) throw new Error("Respuesta inválida al listar usuarios.");
            return response;
        } catch (error) {
            console.error("❌ Error obteniendo usuarios:", error);
            throw this._wrapError(error, "lista de usuarios");
        }
    }

    async deleteUser(userId) {
        try {
            const response = await api.delete(`${API_CONFIG.ENDPOINTS.USERS.DELETE}/${userId}`);
            return response;
        } catch (error) {
            console.error("❌ Error eliminando usuario:", error);
            throw this._wrapError(error, `eliminación del usuario ${userId}`);
        }
    }

    async verifyToken(token) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY, { token });

            if (!response?.valid) {
                throw new Error("Token inválido");
            }

            return response;
        } catch (error) {
            console.error("❌ Error verificando token:", error);
            throw this._wrapError(error, "verificación de token");
        }
    }

    _wrapError(error, contexto) {
        return {
            message: error.message || `Error en ${contexto}`,
            status: error.status || 500,
            detail: error.detail || error.message,
        };
    }
}

export const authService = new AuthService();