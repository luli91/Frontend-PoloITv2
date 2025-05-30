import { API_CONFIG } from '../config/config';
import { store } from '../redux/store';

class ApiService {
    getHeaders() {
        let token = store.getState().auth.token;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (token) {
            // Evita duplicar "Bearer Bearer ..."
            if (!token.startsWith('Bearer ')) {
                token = `Bearer ${token}`;
            }

            headers['Authorization'] = token;

            // Solo en desarrollo
            if (import.meta.env.DEV) {
                console.log('🔑 Authorization Header:', headers['Authorization']);
            }
        } else {
            console.warn('⚠️ No token found in store');
        }

        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
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
            } catch (parseError) {
                console.error('❌ Error parsing response:', parseError);
                parsedData = {};
            }

            if (!response.ok) {
                const errorData = {
                    status: response.status,
                    statusText: response.statusText,
                    detail: parsedData.detail || parsedData.message || 'Error del servidor',
                    data: parsedData
                };
                throw errorData;
            }

            return parsedData;
        } catch (error) {
            if (error.status) throw error;

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
