import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarDonaciones, actualizarDonacion, eliminarDonacion } from "../../redux/slices/donacionesSlice";
import { publicacionesService } from "../../services/publicacionesServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { ProgressSpinner } from "primereact/progressspinner";
import FormularioDonacion from "../../components/FormularioDonacion";
import { Dialog } from "primereact/dialog";
import { listarCategorias } from "../../redux/slices/categoriasSlice";

export default function Donaciones() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { items = [], total = 0 } = useSelector((state) => state.donaciones.lista || {});
  const token = localStorage.getItem("authToken") || useSelector((state) => state.auth.token);
  const [loadingDonaciones, setLoadingDonaciones] = useState(false);
  const [selectedDonaciones, setSelectedDonaciones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [donacionSeleccionada, setDonacionSeleccionada] = useState(null);
  const usuarioActual = useSelector((state) => state.auth.user);
  const categorias = useSelector((state) => state.categorias.items);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoadingDonaciones(true);

        if (!categorias.length) {
          await dispatch(listarCategorias()).unwrap();
        }

        await dispatch(
            listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })
        ).unwrap();
      } catch (err) {
        console.error("❌ Error al cargar datos iniciales:", err);
      } finally {
        setLoadingDonaciones(false);
      }
    };

    cargarDatos();
  }, [dispatch, pagina, filasPorPagina]);

  const handleCrearPublicacion = async () => {
    if (!selectedDonaciones.length || !token) {
      toast.current.show({
        severity: "warn",
        summary: "Atención",
        detail: "Selecciona al menos una donación y verifica tu sesión",
        life: 3000,
      });
      return;
    }

    for (const donacion of selectedDonaciones) {
      try {
        const yaExiste = await publicacionesService.getByDonacion(donacion.id);
        if (yaExiste?.id) {
          toast.current.show({
            severity: "info",
            summary: "Ya publicada",
            detail: `La donación ID ${donacion.id} ya tiene una publicación.`,
            life: 3000,
          });
          continue;

        }

        console.log("📤 Intentando crear publicación para:", donacion.id);
        const nueva = await publicacionesService.create(
            {
              mensaje: "Precarga de publicación",
              donacion_id: donacion.id,
            },
            token
        );

        if (!nueva || !nueva.id) {
          throw new Error("No se recibió ID de la publicación recién creada");
        }

        console.log("🆕 Publicación creada:", nueva);

        const actualizada = await publicacionesService.update(
            nueva.id,
            { visible: false },
            token
        );

        console.log("🔄 Visibilidad actualizada:", actualizada);

        await new Promise((r) => setTimeout(r, 100));
        await dispatch(
            listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })
        ).unwrap();

        toast.current.show({
          severity: "success",
          summary: "Publicación creada",
          detail: `Se generó publicación para la donación ID: ${donacion.id}`,
          life: 3000,
        });
      } catch (err) {
        console.error(`❌ Error al crear o actualizar publicación para la donación ${donacion.id}`, err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `No se pudo crear o actualizar la publicación para la donación ${donacion.id}`,
          life: 3000,
        });
      }
    }
  };

  const handleEliminar = async (donacion) => {
    try {
      await dispatch(eliminarDonacion({ id: donacion.id, token })).unwrap();

      toast.current.show({
        severity: "success",
        summary: "Donación eliminada",
        detail: `Se eliminó correctamente la donación ID: ${donacion.id}`,
        life: 3000,
      });

      await publicacionesService.create(
          `Publicación sobre: ${donacion.descripcion}`,
          donacion.id,
          token
      );

      await dispatch(
          listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })
      ).unwrap();
    } catch (err) {
      console.error("❌ Error al eliminar donación o crear publicación:", err);
      toast.current.show({
        severity: "error",
        summary: "Error al eliminar",
        detail: `No se pudo eliminar la donación ID: ${donacion.id}`,
        life: 3000,
      });
    }
  };

  return (
      <div className="p-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Crear Donación</h2>
        <FormularioDonacion
            onGuardado={async () => {
              try {
                setLoadingDonaciones(true);
                await dispatch(
                    listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })
                ).unwrap();
              } catch (err) {
                console.error("❌ Error al refrescar después de crear donación:", err);
              } finally {
                setLoadingDonaciones(false);
              }
            }}
        />

        <h2 className="text-2xl font-bold mb-4">Listado de Donaciones</h2>

        {loadingDonaciones ? (
            <div className="flex justify-center items-center h-40">
              <ProgressSpinner style={{ width: "50px", height: "50px" }} />
            </div>
        ) : (
            <DataTable
                value={items}
                dataKey="id"
                lazy
                paginator
                first={pagina * filasPorPagina}
                rows={filasPorPagina}
                totalRecords={total}
                onPage={async (e) => {
                  const nuevaPagina = e.first / e.rows;
                  const nuevasFilas = e.rows;

                  setPagina(nuevaPagina);
                  setFilasPorPagina(nuevasFilas);

                  try {
                    setLoadingDonaciones(true);
                    await dispatch(
                        listarDonaciones({ page: nuevaPagina + 1, perPage: nuevasFilas })
                    ).unwrap();
                  } catch (err) {
                    console.error("❌ Error al paginar:", err);
                  } finally {
                    setLoadingDonaciones(false);
                  }
                }}
                loading={loadingDonaciones}
                selectionMode="multiple"
                selection={selectedDonaciones}
                onSelectionChange={(e) => setSelectedDonaciones(e.value)}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                scrollable
                scrollHeight="400px"
            >
              <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
              <Column field="descripcion" header="Descripción" />
              <Column field="cantidad" header="Cantidad" />
              <Column
                  field="categoria_id"
                  header="Categoría"
                  body={(rowData) => {
                    const cat = categorias.find((c) => c.id === rowData.categoria_id);
                    return cat?.nombre || "-";
                  }}
              />
              <Column
                  field="usuario.ubicacion.ciudad"
                  header="Ubicación"
                  filter
                  filterPlaceholder="Buscar ubicación"
              />
              <Column
                  field="tiene_publicacion"
                  header="Publicado"
                  body={(rowData) => (
                      <span>{rowData.tiene_publicacion ? "Sí" : "No"}</span>
                  )}
              />
              <Column
                  header="Editar"
                  body={(rowData) =>
                      rowData.usuario?.id === usuarioActual?.id ? (
                          <Button
                              icon="pi pi-pencil"
                              className="p-button-text p-button-sm"
                              onClick={() => {
                                setDonacionSeleccionada(rowData);
                                setMostrarEditor(true);
                              }}
                          />
                      ) : null
                  }
              />
              <Column
                  header="Eliminar"
                  body={(rowData) =>
                      rowData.usuario?.id === usuarioActual?.id ? (
                          <Button
                              icon="pi pi-trash"
                              className="p-button-rounded p-button-danger p-button-text"
                              onClick={() => handleEliminar(rowData)}
                          />
                      ) : null
                  }
              />
            </DataTable>
        )}

        <div className="flex justify-end mt-4">
          <Button
              label="Precarga de publicación"
              onClick={handleCrearPublicacion}
              disabled={!selectedDonaciones.length}
          />
        </div>

        {mostrarEditor && (
            <Dialog
                header="Editar Donación"
                visible
                modal
                onHide={() => {
                  setMostrarEditor(false);
                  setDonacionSeleccionada(null);
                }}
                style={{ width: "60rem" }}
            >
              <FormularioDonacion
                  donacion={donacionSeleccionada}
                  onGuardado={async () => {
                    setMostrarEditor(false);
                    setDonacionSeleccionada(null);
                    try {
                      setLoadingDonaciones(true);
                      await dispatch(
                          listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })
                      ).unwrap();
                    } catch (err) {
                      console.error("❌ Error al refrescar donaciones:", err);
                    } finally {
                      setLoadingDonaciones(false);
                    }
                  }}
              />
            </Dialog>
        )}
      </div>
  );
}

