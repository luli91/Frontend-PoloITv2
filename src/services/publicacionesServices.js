import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

export const publicacionesService = {
  // 🔹 Para Publicaciones.jsx (vista pública paginada)
  getDetalle: (page = 1, perPage = 10) =>
    api.get(`${API_CONFIG.ENDPOINTS.PUBLICACIONES.DETAIL}?page=${page}&per_page=${perPage}`),

  // 🔹 Para Donaciones.jsx → verificar si una donación ya tiene publicación
  getByDonacion: (donacionId) =>
    api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.GET_BY_DONACION(donacionId)),

  // 🔹 Para Donaciones.jsx → crear una nueva publicación vacía/preliminar
  create: (mensaje, donacionId, token) =>
    api.post(
      API_CONFIG.ENDPOINTS.PUBLICACIONES.BASE,
      { mensaje, donacion_id: parseInt(donacionId), visible: false },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};
