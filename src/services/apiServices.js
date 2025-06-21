
import { API_CONFIG } from '../config/config';

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    getHeaders() {
    let token = localStorage.getItem("authToken");
    
    if (!token) {
        console.warn("⚠️ Intentando obtener token antes de que se guarde. Posible primer intento.");
        return {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };
}


    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = this.getHeaders();

        const config = {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
                "X-Forwarded-Proto": "https",
            },
            mode: "cors",
        };

        console.log("📡 Headers antes de la solicitud:", config.headers);

 try {

  const response = await fetch(url, config);

  if (!response.ok) {
    const errText = await response.text();  // capturamos el error más informativo
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  } else if (contentType.includes("text")) {
    return await response.text();
  } else {
    return null; // para respuestas sin contenido o headers
  }

} catch (error) {

            console.error("❌ Error en la solicitud:", error);
            throw error;
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