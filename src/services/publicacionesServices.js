import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

const DEBUG_MODE = false;

function _wrapError(error, contexto) {
  console.error(`❌ Error en ${contexto}:`, error);
  throw {
    message: error.message || `Error en ${contexto}`,
    status: error.status || 500,
    detail: error.detail || error.message,
  };
}

export const publicacionesService = {
  async getDetalle(page = 1, perPage = 10) {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.DETAIL, {
        page,
        per_page: perPage,
      });
      if (DEBUG_MODE) console.log("📄 Publicaciones obtenidas:", response);
      return response;
    } catch (error) {
      _wrapError(error, "obtener publicaciones públicas");
    }
  },

  async getByDonacion(donacionId) {
  try {
    return await api.get(API_CONFIG.ENDPOINTS.PUBLICACIONES.GET_BY_DONACION(donacionId));
  } catch (error) {
    if (error?.response?.status === 404) {
      return null; 
    }
    _wrapError(error, `verificar publicación para donación ${donacionId}`);
  }
},


async create(payload, token) {
  try {
    const data = await api.post(
      API_CONFIG.ENDPOINTS.PUBLICACIONES.BASE,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log("✅ Publicación creada desde servicio:", data);
    return data;
  } catch (error) {
       _wrapError(error, `crear publicación para donación ${payload?.donacion_id}`);
  }
},

async update(publicacionId, data) {
  try {
    return await api.put(
      API_CONFIG.ENDPOINTS.PUBLICACIONES.EDIT_BY_PUBLICACION(publicacionId),
      data
    );
  } catch (error) {
    _wrapError(error, `actualizar publicación ${publicacionId}`);
  }
}
}