import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

export const misPublicacionesService = {
  getPaginated: (page = 1, perPage = 10) =>
    api.get(`${API_CONFIG.ENDPOINTS.PUBLICACIONES.MY}?page=${page}&per_page=${perPage}`),

  editByDonacion: (donacionId, data) => {
  const token = localStorage.getItem("authToken");
  return api.put(API_CONFIG.ENDPOINTS.PUBLICACIONES.EDIT_BY_DONACION(donacionId), data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
},

  delete: (id) => api.delete(API_CONFIG.ENDPOINTS.PUBLICACIONES.DELETE(id)),
};
