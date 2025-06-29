// src/models/Ubicacion.js
export class Ubicacion {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.direccion = data.direccion || '';
        this.ciudad = data.ciudad || '';
        this.codigo_postal = data.codigo_postal || '';
        this.provincia = data.provincia || '';
    }

    static fromApiResponse(data) {
        return new Ubicacion(data);
    }

    toOption() {
        return {
            value: this.id,
            label: `${this.ciudad}, ${this.provincia}`,
        };
    }

    toJSON() {
        return {
            id: this.id,
            direccion: this.direccion,
            ciudad: this.ciudad,
            codigo_postal: this.codigo_postal,
            provincia: this.provincia,
        };
    }
}
