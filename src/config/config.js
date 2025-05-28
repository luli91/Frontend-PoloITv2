export const API_CONFIG = {
/*
    BASE_URL: 'https://backend-poloit-testing.up.railway.app',
*/
    BASE_URL: 'http://localhost:8000',

    ENDPOINTS: {
        AUTH: {
            LOGIN: '/usuarios/login',
            REGISTER: '/usuarios/registro',
            PROFILE: '/usuarios/me',
        },
        USERS: {
            GET: '/usuarios',
            DELETE: '/usuarios',
        }
    }
};