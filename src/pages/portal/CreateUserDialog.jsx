import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useToast } from '../../hooks/useToast';
import { authService } from '../../services/authServices';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Dropdown } from 'primereact/dropdown';
import ProvinciaSelect from '../../components/ProvinciaSelect';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function CreateUserDialog({ visible, onHide, onSuccess }) {
    const toast = useToast();
    const stepperRef = useRef(null);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
        codigo_postal: '',
        ciudad: '',
        provincia: '',
        rol: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 0) {
            if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
            if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Email inválido';
            if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        } else if (step === 1) {
            if (!formData.direccion) newErrors.direccion = 'Dirección requerida';
            if (!formData.codigo_postal) newErrors.codigo_postal = 'Código postal requerido';
            if (!formData.ciudad) newErrors.ciudad = 'Ciudad requerida';
            if (!formData.provincia) newErrors.provincia = 'Provincia requerida';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateStep(1)) return;
        setLoading(true);
        try {
            const result = await authService.register(formData);
            if (result.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Usuario creado',
                    detail: 'El usuario fue registrado exitosamente',
                    life: 3000
                });
                onSuccess();
                onHide();
            }
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: err.detail || err.message,
                life: 4000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog header="Crear nuevo usuario" visible={visible} onHide={onHide} style={{ width: '50rem' }}>
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} orientation="vertical">
                <StepperPanel header="Datos Personales">
                    <br/>
                    <div className="flex flex-column gap-5">
                        <span className="p-float-label">
                            <InputText id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className={errors.nombre && 'p-invalid'} />
                            <label htmlFor="nombre">Nombre completo</label>
                            {errors.nombre && <small className="p-error">{errors.nombre}</small>}
                        </span>

                        <span className="p-float-label">
                            <InputText id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email && 'p-invalid'} />
                            <label htmlFor="email">Correo electrónico</label>
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </span>

                        <span className="p-float-label">
                            <Password id="password" name="password" feedback={true} value={formData.password} onChange={handleChange} toggleMask feedback={true} inputClassName="w-full" className={errors.password && 'p-invalid'} />
                            <label htmlFor="password">Contraseña</label>
                            {errors.password && <small className="p-error">{errors.password}</small>}
                        </span>

                        <span className="p-float-label">
                            <InputText id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                            <label htmlFor="telefono">Teléfono (opcional)</label>
                        </span>

                        <span className="p-float-label">
                            <Dropdown id="rol" name="rol" value={formData.rol} options={[{ label: 'Usuario', value: 'usuario' }, { label: 'Admin', value: 'admin' }]} onChange={(e) => handleSelectChange('rol', e.value)} />
                            <label htmlFor="rol">Rol</label>
                        </span>
                    </div>
                    <div className="flex justify-content-end mt-4">
                        <Button label="Siguiente" icon="pi pi-arrow-right" iconPos="right" onClick={() => validateStep(0) && stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>

                <StepperPanel header="Domicilio y Ubicación">
                    <br/>
                    <div className="flex flex-column gap-5">
                        <span className="p-float-label">
                            <InputText id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} className={errors.direccion && 'p-invalid'} />
                            <label htmlFor="direccion">Dirección</label>
                            {errors.direccion && <small className="p-error">{errors.direccion}</small>}
                        </span>

                        <span className="p-float-label">
                            <InputText id="codigo_postal" name="codigo_postal" value={formData.codigo_postal} onChange={handleChange} className={errors.codigo_postal && 'p-invalid'} />
                            <label htmlFor="codigo_postal">Código Postal</label>
                            {errors.codigo_postal && <small className="p-error">{errors.codigo_postal}</small>}
                        </span>

                        <span className="p-float-label">
                            <InputText id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} className={errors.ciudad && 'p-invalid'} />
                            <label htmlFor="ciudad">Ciudad</label>
                            {errors.ciudad && <small className="p-error">{errors.ciudad}</small>}
                        </span>

                        <ProvinciaSelect value={formData.provincia} onChange={handleChange} error={!!errors.provincia} helperText={errors.provincia} />
                    </div>

                    <div className="flex justify-content-between mt-4">
                        <Button label="Volver" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} className="p-button-secondary" />
                        <Button label="Registrar" icon="pi pi-check" onClick={handleSubmit} disabled={loading} className="p-button-primary" />
                    </div>

                    {loading && (
                        <div className="flex justify-content-center mt-3">
                            <ProgressSpinner style={{ width: '40px', height: '40px' }} strokeWidth="5" />
                        </div>
                    )}
                </StepperPanel>
            </Stepper>
        </Dialog>
    );
}
