import { api } from "./apiServices";
import { API_CONFIG } from "../config/config";

export const notificacionesService = {
    enviarCorreo: (donacion_id) =>
        api.post(API_CONFIG.ENDPOINTS.NOTIFICACIONES.ENVIAR, { donacion_id }),
};
