// src/models/Donacion.js
import { Categoria } from "./Categoria";
import { Usuario } from "./Usuario";

export class Donacion {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.descripcion = data.descripcion || '';
        this.cantidad = data.cantidad || 0;
        this.categoria_id = data.categoria_id || 0;
        this.fecha_creacion = data.fecha_creacion || '';
        this.tiene_publicacion = !!data.tiene_publicacion;
        this.categoria = data.categoria ? Categoria.fromApiResponse(data.categoria) : null;
        this.usuario = data.usuario ? Usuario.fromApiResponse(data.usuario) : null;
    }

    static fromApiResponse(data) {
        return new Donacion(data);
    }

    toOption() {
        return {
            value: this.id,
            label: `${this.descripcion} (${this.cantidad})`,
        };
    }

    toJSON() {
        return {
            id: this.id,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
            categoria_id: this.categoria_id,
            fecha_creacion: this.fecha_creacion,
            tiene_publicacion: this.tiene_publicacion,
            categoria: this.categoria?.toJSON?.() || this.categoria || null,
            usuario: this.usuario?.toJSON?.() || this.usuario || null,
        };
    }

}
