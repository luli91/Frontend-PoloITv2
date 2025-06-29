// src/models/Categoria.js
export class Categoria {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
    }

    static fromApiResponse(data) {
        return new Categoria(data);
    }

    toOption() {
        return {
            value: this.id,
            label: this.nombre,
        };
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
        };
    }


}
