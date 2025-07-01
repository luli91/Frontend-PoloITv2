/**
 * Modelo para representar un Estado del sistema
 * Los estados son definidos en el backend y devueltos por el endpoint /estados/
 */
export class Estado {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
    }

    static fromApiResponse(apiData) {
        return new Estado({
            id: apiData.id,
            nombre: apiData.nombre
        });
    }

    static fromApiResponseArray(apiDataArray) {
        if (!Array.isArray(apiDataArray)) return [];
        return apiDataArray.map(item => Estado.fromApiResponse(item));
    }

    toString() {
        return this.nombre;
    }

    esEstado(nombreEstado) {
        return this.nombre.toLowerCase() === nombreEstado.toLowerCase();
    }

    esEstadoPorId(idEstado) {
        return this.id === idEstado;
    }

    coincideCon(identificador) {
        if (typeof identificador === 'string') {
            return this.esEstado(identificador);
        }
        if (typeof identificador === 'number') {
            return this.esEstadoPorId(identificador);
        }
        return false;
    }

    toOption() {
        return {
            value: this.id,
            label: this.nombre
        };
    }

    estaEnLista(estadosPermitidos) {
        if (!Array.isArray(estadosPermitidos)) return false;
        return estadosPermitidos.some(estado => this.coincideCon(estado));
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre
        };
    }
}

export default Estado;
