import { API_CONFIG } from '../config/config';
import { store } from '../redux/store';

console.log('💡 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL); // Diagnóstico

class ApiService {
    constructor(baseURL) {
        if (!baseURL) throw new Error('❌ baseURL is undefined');
        this.baseURL = baseURL.replace('http://', 'https://');
        console.log('✅ API Base URL (constructor):', this.baseURL);
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
        let url = `${this.baseURL}${endpoint}`;
        if (url.startsWith('http://')) {
            url = url.replace('http://', 'https://');
        }

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
