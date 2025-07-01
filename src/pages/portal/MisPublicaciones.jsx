// MisPublicaciones.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import {
  getMisPublicacionesPaginated,
  actualizarMiPublicacion,
  eliminarMiPublicacion,
  subirImagenPublicacion
} from '../../redux/slices/misPublicacionesSlice';
import { obtenerEstados } from '../../redux/slices/estadosSlice';
import Estado from '../../models/Estado';
import { getPublicacionesDetalle } from '../../redux/slices/publicacionesSlice';
import { misPublicacionesService } from '../../services/misPublicacionesService';


const MisPublicaciones = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { items, total, loading, perPage = 10 } = useSelector((state) => state.misPublicaciones);
  console.log("🧾 Items en tabla:", items);
  const { lista: listaEstadosRaw } = useSelector((state) => state.estados || { lista: [] });
  const listaEstados = Estado.fromApiResponseArray(listaEstadosRaw);

  const [page, setPage] = useState(0);
  const [editandoId, setEditandoId] = useState(null);
  const [mensajeEditado, setMensajeEditado] = useState('');
  const [visibleEditado, setVisibleEditado] = useState(false);
  const [estadoEditado, setEstadoEditado] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getMisPublicacionesPaginated({ page: page + 1, perPage }));
    dispatch(obtenerEstados());
  }, [dispatch, page, perPage]);

  const imageBodyTemplate = (rowData) => {
    return rowData.imagen_url ? (
        <img src={rowData.imagen_url} alt="img" width="64" className="shadow-4" />
    ) : (
        <span className="text-gray-400">Sin imagen</span>
    );
  };

  const visibleTemplate = (rowData) => (rowData.visible ? 'Sí' : 'No');
  const estadoTemplate = (rowData) => rowData.estado_nombre || '—';
  const descripcionDonacionTemplate = (rowData) => rowData.donacion?.descripcion || '—';

  const handleEliminar = (id) => {
    if (!window.confirm(`¿Eliminar publicación ${id}?`)) return;
    dispatch(eliminarMiPublicacion(id)).then(() => {
      toast.current?.show({
        severity: 'success',
        summary: 'Eliminada',
        detail: `Publicación ${id} eliminada`,
        life: 3000
      });
      dispatch(getMisPublicacionesPaginated({ page: page + 1, perPage }));
    });
  };

  const handleEditar = (data) => {
  console.log("📦 Objeto recibido:", data);

  setEditandoId(data.id);
  setMensajeEditado(data.mensaje);
  setVisibleEditado(data.visible);

  const nombreDesdeApi = (data.estado_nombre || data.estado?.nombre || '').trim();
  console.log("🟢 Estado actual en publicación:", nombreDesdeApi);

  const estado = listaEstados.find((e) =>
    e.nombre.trim().toLowerCase() === nombreDesdeApi.toLowerCase()
  );

  console.log("🔄 Estado mapeado encontrado:", estado);
  setEstadoEditado(estado || null);
  setModalVisible(true);
  setDetalle(data);
};


  const handleGuardarEdicion = async () => {
  try {
    // 📝 Editar mensaje y visibilidad (sin tocar el estado)
    await dispatch(
      actualizarMiPublicacion({
        publicacionId: editandoId,
        data: {
          mensaje: mensajeEditado,
          visible: visibleEditado
        }
      })
    ).unwrap();

    // 🟢 Si hay un estado seleccionado, lo actualizamos aparte
    if (estadoEditado?.nombre) {
      await misPublicacionesService.updateEstado(editandoId, estadoEditado.nombre);
      console.log("🎯 Estado actualizado vía endpoint específico:", estadoEditado.nombre);
    }

    // 🔄 Refrescamos desde backend para reflejar todo lo nuevo
    await dispatch(getMisPublicacionesPaginated({ page: page + 1, perPage }));

    if (visibleEditado === true) {
      await dispatch(getPublicacionesDetalle({ page: 1, perPage: 10 }));
    }

    toast.current?.show({
      severity: 'success',
      summary: 'Editada',
      detail: 'Publicación actualizada',
      life: 3000
    });

    setModalVisible(false);
  } catch (error) {
    console.error("❌ Error al editar publicación:", error);
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo editar',
      life: 3000
    });
  }
};


  const onCustomUpload = async (event) => {
    const file = event.files[0];
    try {
      await dispatch(subirImagenPublicacion({ publicacionId: editandoId, file })).unwrap();
      toast.current?.show({ severity: 'success', summary: 'Imagen subida', detail: 'Carga exitosa.', life: 3000 });
      dispatch(getMisPublicacionesPaginated({ page: page + 1, perPage }));
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo subir imagen.', life: 3000 });
    }
  };

  return (
      <div className="card">
        <Toast ref={toast} />
        <h2>Mis Publicaciones</h2>

        <DataTable value={items} loading={loading} paginator={false} responsiveLayout="scroll">
          <Column field="id" header="#" style={{ width: '50px' }} />
          <Column header="Imagen" body={imageBodyTemplate} />
          <Column field="mensaje" header="Mensaje" />
          <Column header="Descripción Donación" body={descripcionDonacionTemplate} />
          <Column
  header="Estado"
  body={(rowData) => {
    console.log("🧪 Estado recibido en fila:", rowData.estado_nombre);
    return rowData.estado_nombre || '—';
  }}
/>

          <Column header="Visible" body={visibleTemplate} />
          <Column
              header="Acciones"
              body={(rowData) => (
                  <>
                    <Button icon="pi pi-pencil" className="p-button-sm p-button-text" onClick={() => handleEditar(rowData)} tooltip="Editar" />
                    <Button icon="pi pi-trash" className="p-button-danger p-button-sm p-button-text" onClick={() => handleEliminar(rowData.id)} tooltip="Eliminar" />
                  </>
              )}
          />
        </DataTable>

        <Paginator
            first={page * perPage}
            rows={perPage}
            totalRecords={total}
            onPageChange={(e) => setPage(e.page)}
        />

        <Dialog header="Editar publicación" visible={modalVisible} onHide={() => setModalVisible(false)} style={{ width: '50vw' }} modal>
          <div className="space-y-3">
            <label>Mensaje</label>
            <InputTextarea value={mensajeEditado} onChange={(e) => setMensajeEditado(e.target.value)} rows={3} className="w-full" />

            <div className="flex items-center gap-2">
              <label>Visible</label>
              <InputSwitch checked={visibleEditado} onChange={(e) => setVisibleEditado(e.value)} />
            </div>

            <label>Estado</label>
            <Dropdown
                value={estadoEditado?.id || null}
                options={listaEstados}
                optionLabel="nombre"
                optionValue="id"
                onChange={(e) => {
                    const seleccionado = listaEstados.find(est => est.id === e.value);
                    setEstadoEditado(seleccionado);
                }}
                placeholder="Seleccioná un estado"
                className="w-full"
            />

            <label>Imagen</label>
            <FileUpload
                name="archivo"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                uploadHandler={onCustomUpload}
                emptyTemplate={<p className="m-0">Arrastrá una imagen o hacé click para subir.</p>}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button label="Guardar" icon="pi pi-save" onClick={handleGuardarEdicion} severity="success" />
              <Button label="Cancelar" icon="pi pi-times" onClick={() => setModalVisible(false)} severity="secondary" />
            </div>
          </div>
        </Dialog>
      </div>
  );
};

export default MisPublicaciones;
