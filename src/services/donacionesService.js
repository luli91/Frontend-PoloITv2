import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

export const donacionesService = {
    getAll: () => api.get(API_CONFIG.ENDPOINTS.DONACIONES.BASE),

    getById: (id) => api.get(API_CONFIG.ENDPOINTS.DONACIONES.ONE(id)),

    create: (descripcion, cantidad, categoriaId, token) => api.post(
        API_CONFIG.ENDPOINTS.DONACIONES.CREATE, 
        { descripcion, cantidad, categoria_id: categoriaId },
        { headers: { Authorization: `Bearer ${token}` } }
    ),

    delete: (id, token) => api.delete(
        API_CONFIG.ENDPOINTS.DONACIONES.DELETE(id), 
        { headers: { Authorization: `Bearer ${token}` } }
    )
};
