import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarDonaciones } from "../../redux/slices/donacionesSlice";
import { publicacionesService } from "../../services/publicacionesServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { ProgressSpinner } from "primereact/progressspinner";
import { getPublicaciones } from "../../redux/slices/publicacionesSlice";
import FormularioDonacion from "../../components/FormularioDonacion";

export default function Donaciones() {
    const toast = useToast();
    const dispatch = useDispatch();
    const donaciones = useSelector(state => state.donaciones.lista);
    const token = localStorage.getItem("authToken") || useSelector(state => state.auth.token);
    const [loadingDonaciones, setLoadingDonaciones] = useState(false);
    const [selectedDonaciones, setSelectedDonaciones] = useState([]);

    useEffect(() => {
        dispatch(listarDonaciones());
    }, [dispatch]);

    const handleCrearPublicacion = () => {
    if (!selectedDonaciones.length || !token) {
        toast.current.show({
            severity: "warn",
            summary: "Atención",
            detail: "Selecciona al menos una donación y verifica tu sesión",
            life: 3000
        });
        return;
    }
    selectedDonaciones.forEach(async (donacion) => {
        console.log("➡️ Enviando publicación con:", {
        mensaje: `Publicación sobre: ${donacion.descripcion}`,
        donacion_id: donacion.id,
        token
    });
        try {
            await publicacionesService.create(
                `Publicación sobre: ${donacion.descripcion}`,
                donacion.id,
                token
            );

            dispatch(getPublicaciones()); 
            dispatch(listarDonaciones());

            toast.current.show({
                severity: "success",
                summary: "Publicación creada",
                detail: `Se generó publicación para la donación ID: ${donacion.id}`,
                life: 3000
            });
        } catch (err) {
            console.error(`❌ Error al crear publicación para la donación ${donacion.id}`, err);
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `No se pudo crear la publicación para la donación ${donacion.id}`,
                life: 3000
            });
        }
    });
};

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Crear Donación</h2>
            <FormularioDonacion onDonacionCreada={() => dispatch(listarDonaciones())} />
            <h2 className="text-2xl font-bold mb-4">Listado de Donaciones</h2>

            {loadingDonaciones ? (
                <div className="flex justify-center items-center h-40">
                    <ProgressSpinner style={{ width: "50px", height: "50px" }} />
                </div>
            ) : (
                <DataTable
                    value={donaciones}
                    paginator
                    rows={10}
                    loading={loadingDonaciones}
                    dataKey="id"
                    selectionMode="multiple"
                    selection={selectedDonaciones}
                    onSelectionChange={(e) => setSelectedDonaciones(e.value)}
                    scrollable
                    scrollHeight="400px"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                    <Column field="descripcion" header="Descripción" filter filterPlaceholder="Buscar descripción" />
                    <Column field="cantidad" header="Cantidad" filter filterPlaceholder="Buscar cantidad" />
                    <Column field="categoria.nombre" header="Categoría" filter filterPlaceholder="Buscar categoría" />
                    <Column field="usuario.ubicacion.ciudad" header="Ubicación" filter filterPlaceholder="Buscar ubicación" />
                    <Column body={(rowData) => <span>{rowData.tiene_publicacion ? "Sí" : "No"}</span>} header="Publicado" />
                </DataTable>
            )}

            <div className="flex justify-end mt-4">
                <Button label="Publicar Donación Seleccionada" onClick={handleCrearPublicacion} disabled={!selectedDonaciones.length} />
            </div>
        </div>
    );
}