// src/models/Usuario.js
import { Ubicacion } from "./Ubicacion";

export class Usuario {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
        this.email = data.email || '';
        this.telefono = data.telefono || '';
        this.rol = data.rol || '';
        this.ubicacion = data.ubicacion ? Ubicacion.fromApiResponse(data.ubicacion) : null;
    }

    static fromApiResponse(data) {
        return new Usuario(data);
    }

    toOption() {
        return {
            value: this.id,
            label: `${this.nombre} (${this.email})`,
        };
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            rol: this.rol,
            ubicacion: this.ubicacion?.toJSON?.() || this.ubicacion || null,
        };
    }

}
