import { api } from './apiServices';

function _wrapError(error, contexto) {
  console.error(`❌ Error en ${contexto}:`, error);
  throw {
    message: error.message || `Error en ${contexto}`,
    status: error.status || 500,
    detail: error.detail || error.message
  };
}

export const ubicacionService = {
  async getUbicacionActual() {
    try {
      return await api.get('/ubicaciones/mia');
    } catch (error) {
      _wrapError(error, 'obtener ubicación actual');
    }
  },

  async actualizarUbicacion(id, data) {
    try {
      return await api.put(`/ubicaciones/${id}`, data);
    } catch (error) {
      _wrapError(error, `actualizar ubicación con ID ${id}`);
    }
  },

  async crearUbicacion(data) {
    try {
      return await api.post('/ubicaciones', data);
    } catch (error) {
      _wrapError(error, 'crear nueva ubicación');
    }
  }
};
