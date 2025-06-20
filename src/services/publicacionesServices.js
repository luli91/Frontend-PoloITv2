import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

export const publicacionesService = {
    getAll: () => api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.BASE),

    getMine: () => api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.MY),

    getById: (id) => api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.ONE(id)),

    create: (mensaje, donacionId, token) => {
        console.log("➡️ Intentando crear publicación con:", {
            mensaje,
            donacion_id: parseInt(donacionId),
            token
        });

        return api.post(
            API_CONFIG.ENDPOINTS.PUBLICACIONES.BASE, 
            { mensaje, donacion_id: parseInt(donacionId) },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(response => {
            console.log("✅ Publicación creada con éxito:", response);
            return response;
        })
        .catch(error => {
            console.error("❌ Error al crear publicación:", error);
            throw error;
        });
    },

    edit: (id, data) => api.put(API_CONFIG.ENDPOINTS.PUBLICACIONES.EDIT(id), data),

    updateStatus: (id, estado) => api.put(API_CONFIG.ENDPOINTS.PUBLICACIONES.UPDATE_STATUS(id), { estado }),

    delete: (id) => api.delete(API_CONFIG.ENDPOINTS.PUBLICACIONES.DELETE(id))
};
