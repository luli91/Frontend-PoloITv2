export const API_CONFIG = {

    BASE_URL: 'https://backend-poloit-testing.up.railway.app',


    ENDPOINTS: {
        AUTH: {
            LOGIN: '/usuarios/login',
            REGISTER: '/usuarios/registro',
            PROFILE: '/usuarios/me',
        },
        USERS: {
            GET: '/usuarios/',
            DELETE: '/usuarios',
        }
    }
};