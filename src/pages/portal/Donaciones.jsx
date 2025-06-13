import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { api } from '../../services/apiServices';
import { useToast } from '../../hooks/useToast'; // 👈 importá el hook
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Donaciones() {
    const toast = useToast();
    const [loadingDonaciones, setLoadingDonaciones] = useState(false);

    const [donaciones, setDonaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        descripcion: '',
        cantidad: '',
        categoria_id: ''
    });

    const [selectedDonaciones, setSelectedDonaciones] = useState([]);
    const [filters, setFilters] = useState({
        descripcion: { value: '', matchMode: 'contains' },
        cantidad: { value: '', matchMode: 'contains' },
        categoria: { value: '', matchMode: 'contains' },
        ubicacion: { value: '', matchMode: 'contains' },
    });

    const fetchDonaciones = () => {
        setLoadingDonaciones(true);
        api.get('/donaciones/')
            .then(res => setDonaciones(res))
            .catch(err => console.error('Error al listar donaciones', err))
            .finally(() => setLoadingDonaciones(false));
    };

    useEffect(() => {
        api.get('/categorias/')
            .then(res => setCategorias(res))
            .catch(err => console.error('Error al cargar categorías', err));

        fetchDonaciones();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.descripcion || !formData.cantidad || !formData.categoria_id) return;

        api.post('/donaciones', {
            descripcion: formData.descripcion,
            cantidad: parseInt(formData.cantidad),
            categoria_id: formData.categoria_id
        })
            .then(() => {
                setFormData({ descripcion: '', cantidad: '', categoria_id: '' });
                fetchDonaciones();

                toast.current.show({
                    severity: 'success',
                    summary: 'Donación creada',
                    detail: 'Se creó la donación exitosamente',
                    life: 3000
                });
            })
            .catch(err => {
                console.error('Error al crear donación', err);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.detail || 'No se pudo crear la donación',
                    life: 3000
                });
            });
    };

    const headerTemplate = (data) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">Categoría: {data.categoria.nombre}</span>
            </div>
        );
    };

    const footerTemplate = (data) => {
        // Calcular el total de las donaciones dentro del grupo de la categoría
        const total = donaciones.filter(donacion => donacion.categoria.nombre === data.categoria.nombre).length;
        return (
            <React.Fragment>
                <td colSpan="5">
                    <div className="flex justify-content-end font-bold w-full">
                        Total de Donaciones en {data.categoria.nombre}: {total}
                    </div>
                </td>
            </React.Fragment>
        );
    };

    const onSelectionChange = (e) => {
        setSelectedDonaciones(e.value);
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Crear Donación</h2>

            <div className="flex flex-col gap-4">
                <span className="p-float-label">
                    <InputText id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                    <label htmlFor="descripcion">Descripción</label>
                </span>

                <span className="p-float-label">
                    <InputText id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} keyfilter="int" />
                    <label htmlFor="cantidad">Cantidad</label>
                </span>

                <span className="p-float-label">
                    <Dropdown
                        className="w-80"
                        id="categoria_id"
                        name="categoria_id"
                        value={formData.categoria_id}
                        options={categorias.map(c => ({ label: c.nombre, value: c.id }))}
                        onChange={(e) => setFormData(prev => ({ ...prev, categoria_id: e.value }))}
                        placeholder="Seleccionar categoría"
                    />
                    <label htmlFor="categoria_id">Categoría</label>
                </span>

                <Button label="Crear Donación" onClick={handleSubmit} />
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-6">Listado de Donaciones</h2>

            {loadingDonaciones ? (
                <div className="flex justify-center items-center h-40">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                </div>
            ) : (
                <DataTable
                    value={donaciones}
                    paginator
                    rows={10}
                    loading={loadingDonaciones}
                    dataKey="id"
                    groupRowsBy="categoria.nombre"
                    rowGroupMode="subheader"
                    sortMode="single"
                    sortField="categoria.nombre"
                    sortOrder={1}
                    scrollable
                    scrollHeight="400px"
                    rowGroupHeaderTemplate={headerTemplate}
                    rowGroupFooterTemplate={footerTemplate}
                    selectionMode="multiple"
                    selection={selectedDonaciones}
                    onSelectionChange={onSelectionChange}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column field="descripcion" header="Descripción" filter filterPlaceholder="Buscar descripción" />
                    <Column field="cantidad" header="Cantidad" filter filterPlaceholder="Buscar cantidad" />
                    <Column field="categoria.nombre" header="Categoría" filter filterPlaceholder="Buscar categoría" />
                    <Column field="usuario.ubicacion.ciudad" header="Ubicación" filter filterPlaceholder="Buscar ubicación" />
                    <Column body={(rowData) => <span>{rowData.tiene_publicacion ? 'Sí' : 'No'}</span>} header="Publicado" />
                </DataTable>
            )}
        </div>
    );
}
