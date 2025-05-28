import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { api } from '../../services/apiServices';
import { useToast } from '../../hooks/useToast'; // 👈 importá el hook
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Donaciones() {
    const toast = useToast(); // 👈 usá el hook
    const [loadingDonaciones, setLoadingDonaciones] = useState(false);

    const [donaciones, setDonaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        descripcion: '',
        cantidad: '',
        categoria_id: ''
    });

    const fetchDonaciones = () => {
        setLoadingDonaciones(true);
        api.get('/donaciones')
            .then(res => setDonaciones(res))
            .catch(err => console.error('Error al listar donaciones', err))
            .finally(() => setLoadingDonaciones(false));
    };


    useEffect(() => {
        api.get('/categorias')
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

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Crear Donación</h2>

            <Card title="Nueva Donación" className="w-full md:w-[32rem] mx-auto mb-6 shadow-md">
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
            </Card>

            <Divider />

            <h2 className="text-2xl font-bold mb-4">Listado de Donaciones</h2>

            {loadingDonaciones ? (
                <div className="flex justify-center items-center h-40">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {donaciones.map((donacion) => (
                        <Card key={donacion.id} title={donacion.descripcion} subTitle={`Categoría: ${donacion.categoria?.nombre}`}>
                            <p>Cantidad: {donacion.cantidad}</p>
                            <p>Ubicación: {donacion.usuario?.ubicacion?.ciudad}, {donacion.usuario?.ubicacion?.provincia}</p>
                            <p>Publicado: {donacion.tiene_publicacion ? 'Sí' : 'No'}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
