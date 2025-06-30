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
            ONE: (donacionId) => `/donaciones/${donacionId}`,
            CREATE: "/donaciones",
            DELETE: (donacionId) => `/donaciones/${donacionId}`,
            UPDATE: (donacionId) => `/donaciones/${donacionId}`,

        },
        ESTADOS: {
            BASE: "/estados/",
            UPDATE: (estadoId) => `/estados/${estadoId}`,
            CREATE: "/estados/",
            DELETE: (estadoId) => `/estados/${estadoId}`
        },
        PUBLICACIONES: {  
            BASE: '/publicaciones/',
            MY: '/publicaciones/mis',
            DELETE: (publicacionId) => `/publicaciones/${publicacionId}`,
            UPDATE_ESTADO: (publicacionId) => `/publicaciones/${publicacionId}/estado`,
            DETAIL: '/publicaciones/detalle',
            EDIT_BY_PUBLICACION: (publicacionId) => `/publicaciones/${publicacionId}`,
            GET_BY_DONACION: (donacionId) => `/publicaciones/por-donacion/${donacionId}`,
            UPDATE_IMAGE: (publicacionId) => `/publicaciones/${publicacionId}/upload-imagen`,
        },
        CATEGORIAS: {
        GET_ALL: "/categorias/",
        }
    }
};