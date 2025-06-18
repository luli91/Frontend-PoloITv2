export const API_CONFIG = {

    BASE_URL: import.meta.env.VITE_API_BASE_URL,

    ENDPOINTS: {
        AUTH: {
            LOGIN: '/usuarios/login',
            REGISTER: '/usuarios/registro',
            PROFILE: '/usuarios/me',
        },
        USERS: {
            GET: '/usuarios/',
            DELETE: '/usuarios',
        },
        PUBLICACIONES: {  
            BASE: '/publicaciones',
            MY: '/publicaciones/mias',
            ONE: (id) => `/publicaciones/${id}`,
            EDIT: (id) => `/publicaciones/${id}`,
            UPDATE_STATUS: (id) => `/publicaciones/${id}/estado`,
            DELETE: (id) => `/publicaciones/${id}`
        }
    }
};