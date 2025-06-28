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
        DONACIONES: {  
            BASE: "/donaciones/",
            ONE: (id) => `/donaciones/${id}`,
            CREATE: "/donaciones",
            DELETE: (id) => `/donaciones/${id}`
        },
        PUBLICACIONES: {  
            BASE: '/publicaciones/',
            MY: '/publicaciones/mis',
            DELETE: (id) => `/publicaciones/${id}`,
            UPDATE_ESTADO: (id) => `/publicaciones/${id}/estado`,
            DETAIL: '/publicaciones/detalle',
            EDIT_BY_DONACION: (donacionId) => `/publicaciones/por-donacion/${donacionId}`,
            GET_BY_DONACION: (donacionId) => `/publicaciones/por-donacion/${donacionId}`,
        }
    }
};