import { api } from './apiServices';
import { API_CONFIG } from '../config/config';

const DEBUG_MODE = false;

function _wrapError(error, contexto) {
    console.error(`❌ Error en ${contexto}:`, error);
    throw {
        message: error.message || `Error en ${contexto}`,
        status: error.status || 500,
        detail: error.detail || error.message
    };
}

export const userService = {
    async getAll() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.GET);
            if (DEBUG_MODE) console.log("✅ Usuarios obtenidos:", response);
            return response;
        } catch (error) {
            _wrapError(error, "obtener usuarios");
        }
    },

    async deleteById(id) {
        try {
            return await api.delete(`${API_CONFIG.ENDPOINTS.USERS.DELETE}/${id}`);
        } catch (error) {
            _wrapError(error, `eliminar usuario ${id}`);
        }
    },

    async create(data) {
        try {
            return await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data);
        } catch (error) {
            _wrapError(error, "crear usuario");
        }
    }
};