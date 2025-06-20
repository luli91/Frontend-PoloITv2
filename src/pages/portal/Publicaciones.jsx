import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicaciones } from "../../redux/slices/publicacionesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

export default function Publicaciones() {
  const dispatch = useDispatch();
  const { publicaciones, loading, error } = useSelector(state => state.publicaciones);

  useEffect(() => {
    dispatch(getPublicaciones());
  }, [dispatch]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Publicaciones actuales</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ProgressSpinner />
        </div>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
        <DataTable
          value={publicaciones}
          paginator
          rows={10}
          scrollable
          scrollHeight="400px"
          dataKey="id"
          filterDisplay="menu"
        >
          <Column field="id" header="ID" />
          <Column field="mensaje" header="Mensaje" filter filterPlaceholder="Buscar mensaje" />
          <Column field="estado" header="Estado" filter filterPlaceholder="Buscar estado" />
          <Column field="fecha_publicacion" header="Fecha publicación" />
          <Column field="donacion.descripcion" header="Donación" filter filterPlaceholder="Buscar donación" />
          <Column field="donacion.usuario.nombre" header="Usuario" filter filterPlaceholder="Buscar usuario" />
        </DataTable>
      )}
    </div>
  );
}
