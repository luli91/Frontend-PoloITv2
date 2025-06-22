import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicaciones } from "../../redux/slices/publicacionesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { eliminarPublicacion } from "../../redux/slices/publicacionesSlice";


export default function Publicaciones() {
  const dispatch = useDispatch();
  const { publicaciones, loading, error } = useSelector(state => state.publicaciones);

  useEffect(() => {
    dispatch(getPublicaciones());
  }, [dispatch]);

  const toast = useToast();

  const handleEliminarPublicacion = (id) => {
  if (!window.confirm(`¿Eliminar publicación ${id}?`)) return;
  dispatch(eliminarPublicacion(id)) // si usás Redux
    .unwrap()
    .then(() => {
      toast.current.show({
        severity: "success",
        summary: "Publicación eliminada",
        detail: `La publicación ${id} fue eliminada correctamente.`,
        life: 3000
      });
    })
    .catch((err) => {
      console.error(`❌ Error al eliminar publicación ${id}`, err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `No se pudo eliminar la publicación ${id}`,
        life: 3000
      });
    });
};

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
          <Column
          header="Acciones"
          body={(rowData) => (
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              className="p-button-danger p-button-sm"
              onClick={() => handleEliminarPublicacion(rowData.id)} />
            )}
          style={{ width: "8rem" }} />
        </DataTable>
      )}
    </div>
  );
}
