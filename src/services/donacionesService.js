import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";
import { handleApiError } from "../utils/errorHandler";

export const donacionesService = {
    getAll: async (page, perPage) => {
        const params = { page, per_page: perPage };
        try {
            return await api.get(API_CONFIG.ENDPOINTS.DONACIONES.BASE, params);
        } catch (err) {
            handleApiError("donacionesService.getAll", err);
        }
    },

    getById: (id) =>
        api.get(API_CONFIG.ENDPOINTS.DONACIONES.ONE(id)),

    create: (descripcion, cantidad, categoriaId, token) =>
        api.post(
            API_CONFIG.ENDPOINTS.DONACIONES.CREATE,
            { descripcion, cantidad, categoria_id: categoriaId },
            { headers: { Authorization: `Bearer ${token}` } }
        ),

    delete: (id, token) =>
        api.delete(API_CONFIG.ENDPOINTS.DONACIONES.DELETE(id), {
            headers: { Authorization: `Bearer ${token}` },
        }),

    update: (id, data, token) =>
        api.put(API_CONFIG.ENDPOINTS.DONACIONES.UPDATE(id),data,{
             headers: { Authorization: `Bearer ${token}` } 
            }),

};
