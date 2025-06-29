import { API_CONFIG } from "../config/config";
import { api } from "./apiServices";

export const categoriasService = {
  async getAll() {
    const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIAS.GET_ALL);
    return response.map((cat) => cat);
  },
};
