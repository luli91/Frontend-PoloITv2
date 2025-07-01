import axios from "axios";
import { API_CONFIG } from "../config/config";
const DEBUG_MODE = false; 

class ApiService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Forwarded-Proto": "https",
            },
        });

        this._setInterceptors();
    }

    _setInterceptors() {
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            if (DEBUG_MODE) {
                console.log("📡 Request:", config.method?.toUpperCase(), config.url, config);
            }

            return config;
        });

        this.client.interceptors.response.use(
            (response) => {
                if (DEBUG_MODE) {
                    console.log("✅ Response:", response);
                }
                return response;
            },
            (error) => {
                console.error("❌ Error en Axios:", error);
                return Promise.reject(error);
            }
        );

    }

    get(endpoint, params = {}) {
        return this._handle(() => this.client.get(endpoint, { params }));
    }

    post(endpoint, data) {
        return this._handle(() => this.client.post(endpoint, data));
    }

    put(endpoint, data) {
        return this._handle(() => this.client.put(endpoint, data));
    }

    delete(endpoint) {
        return this._handle(() => this.client.delete(endpoint));
    }

    putMultipart(endpoint, formData) {
        return this._handle(() =>
            this.client.put(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    }

    async _handle(requestFn) {
        try {
            const res = await requestFn();
            return res.data;
        } catch (error) {
            // Acá podrías llamar a handleApiError("api", error);
            throw error;
        }
    }
}

export const api = new ApiService(API_CONFIG.BASE_URL);