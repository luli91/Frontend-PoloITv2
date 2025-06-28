import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMisPublicacionesPaginated,
  actualizarMiPublicacion,
  eliminarMiPublicacion,
} from "../../redux/slices/misPublicacionesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useToast } from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";

const ESTADOS = ["Pendiente", "Entregado", "Cancelado"];

export default function MisPublicaciones() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { items, loading, total, perPage } = useSelector(
    (state) => state.misPublicaciones
  );
  const [pageState, setPageState] = useState(0);
  const [gridData, setGridData] = useState([]);   
  const [detalle, setDetalle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 1) Carga inicial y re-carga de Redux → adaptar a local
  useEffect(() => {
    dispatch(getMisPublicacionesPaginated({ page: pageState + 1, perPage }));
  }, [dispatch, pageState, perPage]);

  // 2) Cada vez que items cambie, actualizo mi gridData
  useEffect(() => {
    setGridData(items);
  }, [items]);

  // 3) Snapshots para cancelar edición
  const [originalRows, setOriginalRows] = useState({});

  const onRowEditInit = (event) => {
    setOriginalRows((prev) => ({
      ...prev,
      [event.data.id]: { ...event.data },
    }));
  };

  const onRowEditCancel = (event) => {
    
    setGridData((prev) => {
      const data = [...prev];
      const idx = data.findIndex((r) => r.id === event.data.id);
      data[idx] = originalRows[event.data.id];
      return data;
    });
    setOriginalRows((prev) => {
      const copy = { ...prev };
      delete copy[event.data.id];
      return copy;
    });
  };

  // 4) Guardar edición
  const onRowEditSave = async (event) => {
    const { id, mensaje, estado, visible, donacion } = event.data;
    if (!mensaje.trim()) {
      toast.current.show({
        severity: "warn",
        summary: "Mensaje requerido",
        detail: "El mensaje no puede estar vacío.",
        life: 3000,
      });
      return;
    }

    // 4.a) Actualizo la fila en la UI
    setGridData((prev) => {
      const data = [...prev];
      const idx = data.findIndex((r) => r.id === id);
      data[idx] = event.data; 
      return data;
    });

    // 4.b) Envío al backend
    try {
      await dispatch(
        actualizarMiPublicacion({
          donacionId: donacion.id,
          data: { mensaje, estado, visible, imagen_url: null },
        })
      ).unwrap();

      toast.current.show({
        severity: "success",
        summary: "Actualizada",
        detail: `Publicación ${id} actualizada.`,
        life: 3000,
      });

      // Limpio snapshot
      setOriginalRows((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `No se pudo actualizar la publicación ${id}`,
        life: 3000,
      });
      console.error("❌ update error:", err);
    }
  };

  const handleEliminar = (id) => {
    if (!window.confirm(`¿Eliminar publicación ${id}?`)) return;
    dispatch(eliminarMiPublicacion(id));
  };

  const handleVerDetalle = async (id) => {
    try {
      const res = await publicacionesService.getById(id);
      setDetalle(res);
      setModalVisible(true);
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cargar la publicación",
      });
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Publicaciones</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ProgressSpinner />
        </div>
      ) : (
        <DataTable
          value={gridData}                  
          dataKey="id"
          paginator
          first={pageState * perPage}
          rows={perPage}
          totalRecords={total}
          onPage={(e) => setPageState(e.page)}
          editMode="row"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
          onRowEditSave={onRowEditSave}
        >
          <Column field="id" header="ID" />

          <Column
            field="mensaje"
            header="Mensaje"
            editor={(options) => (
              <InputText
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
              />
            )}
          />

          <Column
            field="estado"
            header="Estado"
            editor={(options) => (
              <Dropdown
                value={options.value}
                options={ESTADOS}
                onChange={(e) => options.editorCallback(e.value)}
              />
            )}
          />

          <Column
            field="visible"
            header="Visible"
            body={(rowData) =>
              rowData.visible ? (
                <i className="pi pi-check text-green-500" />
              ) : null
            }
            editor={(options) => (
              <Checkbox
                checked={options.value}
                onChange={(e) => options.editorCallback(e.checked)}
              />
            )}
          />

          <Column
            header="Donación"
            body={(rowData) => <span>{rowData.donacion.descripcion}</span>}
          />

          {/* Íconos Guardar/Cancelar generados por PrimeReact */}
          <Column
            rowEditor
            headerStyle={{ width: "5rem" }}
            bodyStyle={{ textAlign: "center" }}
          />

          {/* Eliminar y Ver */}
          <Column
            header="Acciones"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm" rounded outlined 
                  onClick={() => handleEliminar(rowData.id)}
                />
                <Button
                  icon="pi pi-eye"
                  className="p-button-text p-button-sm"
                  onClick={() => handleVerDetalle(rowData.id)}
                  tooltip="Ver publicación"
                />
              </div>
            )}
          />
        </DataTable>
      )}

      <Dialog
        header={`Publicación ${detalle?.id}`}
        visible={modalVisible}
        style={{ width: "50vw" }}
        onHide={() => setModalVisible(false)}
        modal
        footer={
          <div className="flex justify-end gap-2">
            {detalle?.visible && (
              <Button
                label="Ver pública"
                icon="pi pi-external-link"
                className="p-button-text"
                onClick={() =>
                  window.open(`/publicaciones/${detalle.id}`, "_blank")
                }
              />
            )}
            <Button
              label="Cerrar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setModalVisible(false)}
            />
          </div>
        }
      >
        {detalle ? (
          <div className="space-y-2">
            <p>
              <strong>Mensaje:</strong> {detalle.mensaje}
            </p>
            <p>
              <strong>Estado:</strong> {detalle.estado}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(detalle.fecha_publicacion).toLocaleString()}
            </p>
            <p>
              <strong>Visible:</strong> {detalle.visible ? "Sí" : "No"}
            </p>
            <p>
              <strong>Donación:</strong> {detalle.donacion?.descripcion}
            </p>
          </div>
        ) : (
          <ProgressSpinner />
        )}
      </Dialog>
    </div>
  );
}
