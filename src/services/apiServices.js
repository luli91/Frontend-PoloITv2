
import { API_CONFIG } from '../config/config';
import { store } from '../redux/store';

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getHeaders() {
        const token = store.getState().auth.token;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = this.getHeaders();

        const config = {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        };

        try {
            console.log('📡 Request:', {
                url,
                method: config.method,
                headers: config.headers,
                body: config.body ? JSON.parse(config.body) : undefined
            });

            const response = await fetch(url, config);
            const responseText = await response.text();

            console.log('📥 Response status:', response.status);
            console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
            console.log('📥 Response body:', responseText);

            let parsedData;
            try {
                parsedData = responseText ? JSON.parse(responseText) : {};
                console.log('📦 Parsed data:', parsedData);
            } catch (parseError) {
                console.error('❌ Error parsing response:', parseError);
                console.log('Raw response:', responseText);
                parsedData = {};
            }

            if (!response.ok) {
                const errorData = {
                    status: response.status,
                    statusText: response.statusText,
                    detail: parsedData.detail || parsedData.message || 'Error del servidor',
                    data: parsedData
                };
                console.error('❌ Request failed:', errorData);
                throw errorData;
            }

            return parsedData;
        } catch (error) {
            if (error.status) {
                // Ya es un error formateado por nosotros
                throw error;
            }

            // Error de red u otro error no manejado
            console.error('❌ Network or unhandled error:', error);
            throw {
                status: 0,
                statusText: 'Network Error',
                detail: error.message || 'Error de conexión',
                originalError: error
            };
        }
    }

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export const api = new ApiService(API_CONFIG.BASE_URL);