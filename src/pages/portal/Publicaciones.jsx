import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicacionesDetalle } from "../../redux/slices/publicacionesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Tag } from "primereact/tag";

export default function Publicaciones() {
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState(0);
  const { detalle, loading, error } = useSelector((state) => state.publicaciones);

  const publicacionesVisibles = detalle.items?.filter((pub) => pub.visible) || [];

  useEffect(() => {
    dispatch(getPublicacionesDetalle({ page: pageState + 1, perPage: detalle.perPage }));
  }, [dispatch, pageState]);

  useEffect(() => {
  console.log("📦 Store detalle completo:", detalle);
  console.log("🔍 Items en detalle:", detalle.items);
}, [detalle]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Publicaciones actuales</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ProgressSpinner />
        </div>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
        <DataTable
          value={publicacionesVisibles}
          paginator
          first={pageState * detalle.perPage}
          rows={detalle.perPage}
          totalRecords={detalle.total}
          onPage={(e) => setPageState(e.page)}
          dataKey="id"
          scrollable
          scrollHeight="400px"
          filterDisplay="menu"
        >
          <Column field="id" header="ID" />
          <Column field="donacion.descripcion" header="Donación" />
          <Column field="mensaje" header="Mensaje" />
          <Column
  header="Estado"
  body={(rowData) => {
    const estado = rowData.estado_nombre || '—';
    let severity = 'info';

    switch (estado.toLowerCase()) {
      case 'activa':
        severity = 'success';
        break;
      case 'pendiente':
        severity = 'warning';
        break;
      case 'rechazada':
      case 'entregada':
        severity = 'danger';
        break;
      default:
        severity = 'info';
    }

    return <Tag value={estado} severity={severity} />;
  }}
/>

          <Column field="donacion.usuario.nombre" header="Publicado por" />
        </DataTable>
      )}
    </div>
  );
}
