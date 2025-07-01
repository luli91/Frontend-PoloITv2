import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";
import { handleApiError } from "../utils/errorHandler";

export const estadosService = {
    // Obtener todos los estados disponibles (principalmente para dropdowns/selects)
    getAll: async () => {
        try {
            return await api.get(API_CONFIG.ENDPOINTS.ESTADOS.BASE);
        } catch (err) {
            handleApiError("estadosService.getAll", err);
        }
    },

    // Obtener un estado específico por ID (si es necesario)
    getById: async (id) => {
        try {
            return await api.get(API_CONFIG.ENDPOINTS.ESTADOS.BASE + id);
        } catch (err) {
            handleApiError("estadosService.getById", err);
        }
    },

    // Nota: Los siguientes métodos solo serían necesarios si tu backend
    // permite administrar estados (crear/editar/eliminar)
    // Si los estados son fijos del sistema, puedes eliminar estos métodos

    create: async (nombre, token) => {
        try {
            return await api.post(
                API_CONFIG.ENDPOINTS.ESTADOS.CREATE,
                { nombre },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            handleApiError("estadosService.create", err);
        }
    },

    update: async (id, nombre, token) => {
        try {
            return await api.put(
                API_CONFIG.ENDPOINTS.ESTADOS.UPDATE(id),
                { nombre },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            handleApiError("estadosService.update", err);
        }
    },

    delete: async (id, token) => {
        try {
            return await api.delete(API_CONFIG.ENDPOINTS.ESTADOS.DELETE(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            handleApiError("estadosService.delete", err);
        }
    },
};