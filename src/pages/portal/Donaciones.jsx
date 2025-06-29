import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarDonaciones } from "../../redux/slices/donacionesSlice";
import { publicacionesService } from "../../services/publicacionesServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { ProgressSpinner } from "primereact/progressspinner";
import FormularioDonacion from "../../components/FormularioDonacion";

export default function Donaciones() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { items = [], total = 0 } = useSelector((state) => state.donaciones.lista || {});
  const token = localStorage.getItem("authToken") || useSelector((state) => state.auth.token);
  const [loadingDonaciones, setLoadingDonaciones] = useState(false);
  const [selectedDonaciones, setSelectedDonaciones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);

  // Carga inicial de donaciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDonaciones(true);
        await dispatch(listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })).unwrap();
      } catch (err) {
        console.error("❌ Error al cargar donaciones:", err);
      } finally {
        setLoadingDonaciones(false);
      }
    };
    fetchData();
  }, [dispatch, pagina, filasPorPagina]);

  const handleCrearPublicacion = () => {
    if (!selectedDonaciones.length || !token) {
      toast.current.show({
        severity: "warn",
        summary: "Atención",
        detail: "Selecciona al menos una donación y verifica tu sesión",
        life: 3000,
      });
      return;
    }

    selectedDonaciones.forEach(async (donacion) => {
      try {
        const yaExiste = await publicacionesService.getByDonacion(donacion.id);
        if (yaExiste?.id) {
          toast.current.show({
            severity: "info",
            summary: "Ya publicada",
            detail: `La donación ID ${donacion.id} ya tiene una publicación.`,
            life: 3000,
          });
          return;
        }
      } catch (err) {
        // silencioso si devuelve 404
      }

      try {
        await publicacionesService.create("n", donacion.id, token);
        await dispatch(listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })).unwrap();

        toast.current.show({
          severity: "success",
          summary: "Publicación creada",
          detail: `Se generó publicación para la donación ID: ${donacion.id}`,
          life: 3000,
        });
      } catch (err) {
        console.error(`Error al crear publicación para la donación ${donacion.id}`, err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `No se pudo crear la publicación para la donación ${donacion.id}`,
          life: 3000,
        });
      }
    });
  };

  return (
      <div className="p-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Crear Donación</h2>
        <FormularioDonacion
            onDonacionCreada={async () => {
              try {
                setLoadingDonaciones(true);
                await dispatch(listarDonaciones({ page: pagina + 1, perPage: filasPorPagina })).unwrap();
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
                    await dispatch(listarDonaciones({ page: nuevaPagina + 1, perPage: nuevasFilas })).unwrap();
                  } catch (err) {
                    console.error("❌ Error al paginar:", err);
                  } finally {
                    setLoadingDonaciones(false);
                  }
                }}
                loading={loadingDonaciones}
                dataKey="id"
                selectionMode="multiple"
                selection={selectedDonaciones}
                onSelectionChange={(e) => setSelectedDonaciones(e.value)}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                scrollable
                scrollHeight="400px"
            >
              <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
              <Column field="descripcion" header="Descripción" filter filterPlaceholder="Buscar descripción" />
              <Column field="cantidad" header="Cantidad" filter filterPlaceholder="Buscar cantidad" />
              <Column field="categoria.nombre" header="Categoría" filter filterPlaceholder="Buscar categoría" />
              <Column field="usuario.ubicacion.ciudad" header="Ubicación" filter filterPlaceholder="Buscar ubicación" />
              <Column
                  body={(rowData) => <span>{rowData.tiene_publicacion ? "Sí" : "No"}</span>}
                  header="Publicado"
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
      </div>
  );
}
