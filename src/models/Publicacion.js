import { Donacion } from "./Donacion";
import { Estado } from "./Estado";

export class Publicacion {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.mensaje = data.mensaje || '';
        this.fecha_publicacion = data.fecha_publicacion || '';
        this.imagen_url = data.imagen_url || null;
        this.visible = !!data.visible;
        this.donacion = data.donacion ? Donacion.fromApiResponse(data.donacion) : null;
        this.estado = data.estado ? Estado.fromApiResponse(data.estado) : null;
    }

    static fromApiResponse(data) {
        return new Publicacion(data);
    }

    static fromApiResponseArray(dataArray) {
        if (!Array.isArray(dataArray)) return [];
        return dataArray.map((item) => Publicacion.fromApiResponse(item));
    }

    // 🟢 Métodos útiles
    getFechaFormateada() {
        return new Date(this.fecha_publicacion).toLocaleDateString();
    }

    esVisible() {
        return this.visible;
    }

    tieneImagen() {
        return !!this.imagen_url;
    }

    getDescripcionDonacion() {
        return this.donacion?.descripcion || '—';
    }

    toJSON() {
        return {
            id: this.id,
            mensaje: this.mensaje,
            estado: this.estado,
            fecha_publicacion: this.fecha_publicacion,
            imagen_url: this.imagen_url,
            visible: this.visible,
            donacion: this.donacion?.toJSON?.() || this.donacion || null,
        };
    }


    // 🟢 Para usar en Dropdowns u otros selectores
    toOption() {
        return {
            value: this.id,
            label: `${this.mensaje.slice(0, 40)}... (${this.estado_nombre})`,
        };
    }

    getEstadoNombre() {
        return this.estado?.nombre || '—';
    }
}
