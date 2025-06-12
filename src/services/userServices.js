// src/services/userServices.js
import { api } from './apiServices';
import { API_CONFIG } from '../config/config';

export const userService = {
    getAll: () => {
        return api.get(API_CONFIG.ENDPOINTS.USERS.GET);
    },

    deleteById: (id) => {
        return api.delete(`${API_CONFIG.ENDPOINTS.USERS.DELETE}/${id}`);
    },

    create: (data) => {
        return api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data);
    }
};
