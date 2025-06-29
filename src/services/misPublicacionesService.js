import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

function _wrapError(error, contexto) {
  console.error(`❌ Error en ${contexto}:`, error);
  throw {
    message: error.message || `Error en ${contexto}`,
    status: error.status || 500,
    detail: error.detail || error.message
  };
}

export const misPublicacionesService = {
  async getPaginated(page = 1, perPage = 10) {
    try {
      return await api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.MY, {
        page,
        per_page: perPage,
      });
    } catch (error) {
      _wrapError(error, "obtener publicaciones paginadas");
    }
  },

  async editByPublicacion(publicacionId, data) {
    try {
      return await api.put(API_CONFIG.ENDPOINTS.PUBLICACIONES.EDIT_BY_PUBLICACION(publicacionId), data);
    } catch (error) {
      _wrapError(error, `editar publicación para id ${publicacionId}`);
    }
  },

  async delete(id) {
    try {
      return await api.delete(API_CONFIG.ENDPOINTS.PUBLICACIONES.DELETE(id));
    } catch (error) {
      _wrapError(error, `eliminar publicación con ID ${id}`);
    }
  },

  async uploadImage(publicacionId, file) {
    try {
      const formData = new FormData();
      formData.append("archivo", file);

      return await api.putMultipart(
          API_CONFIG.ENDPOINTS.PUBLICACIONES.UPDATE_IMAGE(publicacionId),
          formData
      );
    } catch (error) {
      _wrapError(error, `subir imagen de publicación ${publicacionId}`);
    }
  },
};
