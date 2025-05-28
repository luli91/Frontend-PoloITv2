
import { api } from './apiServices.js';
import { API_CONFIG } from '../config/config';

class AuthService {
    async login(credentials) {
        try {
            console.log('🔑 Iniciando login con:', {
                email: credentials.email,
                password: '********'
            });

            const loginResponse = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);

            if (!loginResponse || !loginResponse.access_token) {
                throw new Error('No se recibió token en la respuesta');
            }

            const token = `Bearer ${loginResponse.access_token}`;

            // Configurar headers para la siguiente petición
            api.getHeaders = () => ({
                'Content-Type': 'application/json',
                'Authorization': token
            });

            // Obtener información del usuario
            const userResponse = await api.get('/usuarios/me');

            return {
                user: userResponse, // Devolvemos la respuesta completa del usuario
                token
            };
        } catch (error) {
            console.error('Error en login:', error);
            throw {
                message: error.message || 'Error en el inicio de sesión',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async register(userData) {
        try {
            console.log('📝 Registrando nuevo usuario');
            console.log('Datos enviados:', userData);

            const dataToSend = {
                ...userData,
                rol: userData.rol || 'usuario'
            };

            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, dataToSend);

            // Si la respuesta tiene status 200, consideramos que fue exitoso
            if (response && response.id) {
                return {
                    success: true,
                    user: response
                };
            }

            throw new Error('Error en el registro de usuario');
        } catch (error) {
            console.error('Error en registro:', error);
            throw {
                success: false,
                message: error.message || 'Error en el registro',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }
    async updateProfile(userData) {
        try {
            console.log('✏️ Actualizando perfil');
            const response = await api.put(API_CONFIG.ENDPOINTS.USERS.UPDATE, userData);

            if (!response || !response.user) {
                throw new Error('Respuesta de actualización inválida');
            }

            return {
                user: response.user, // Mantenemos los datos completos del usuario
                message: response.message || 'Perfil actualizado exitosamente'
            };
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            throw {
                message: error.message || 'Error al actualizar el perfil',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async getProfile() {
        try {
            console.log('👤 Obteniendo perfil');
            const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);

            if (!response) {
                throw new Error('No se pudo obtener el perfil');
            }

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            throw {
                message: error.message || 'Error al obtener el perfil',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async getUsersList() {
        try {
            console.log('📋 Obteniendo lista de usuarios');
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.LIST);

            if (!response) {
                throw new Error('Formato de respuesta inválido');
            }

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            throw {
                message: error.message || 'Error al obtener la lista de usuarios',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async deleteUser(userId) {
        try {
            console.log('🗑️ Eliminando usuario:', userId);
            const response = await api.delete(`${API_CONFIG.ENDPOINTS.USERS.DELETE}/${userId}`);

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            throw {
                message: error.message || 'Error al eliminar usuario',
                status: error.status || 500,
                detail: error.detail || error.message
            };
        }
    }

    async verifyToken(token) {
        try {
            console.log('🔒 Verificando token');
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY, { token });

            return response; // Devolvemos la respuesta completa
        } catch (error) {
            console.error('Error verificando token:', error);
            return {
                valid: false,
                message: error.message || 'Token inválido'
            };
        }
    }
}

export const authService = new AuthService();