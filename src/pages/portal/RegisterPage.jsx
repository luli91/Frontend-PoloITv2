import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext.jsx';
import ProvinciaSelect from '../../components/ProvinciaSelect.jsx';
import {Stepper} from 'primereact/stepper';
import {StepperPanel} from 'primereact/stepperpanel';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Message} from 'primereact/message';
import {ProgressSpinner} from 'primereact/progressspinner';
import { useToast } from '../../hooks/useToast.jsx';

export default function RegisterPage() {
    const toast = useToast(); // Usa el hook useToast
    const navigate = useNavigate();
    const {handleRegister} = useAuth();
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
        rol: 'usuario'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const validateStep = (stepIndex) => {
        const newErrors = {};

        if (stepIndex === 0) {
            if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) newErrors.email = 'Email no válido';
            if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        }

        if (stepIndex === 1) {
            if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
            if (!formData.codigo_postal.trim()) newErrors.codigo_postal = 'Código postal obligatorio';
            if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es obligatoria';
            if (!formData.provincia.trim()) newErrors.provincia = 'La provincia es obligatoria';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterSubmit = async () => {
        if (validateStep(1)) {
            setLoading(true);
            try {
                const result = await handleRegister(formData);
                if (result.ok) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Registro Exitoso',
                        detail: 'Usuario creado correctamente',
                        life: 2000
                    });

                    // Esperar un momento antes de redirigir
                    setTimeout(() => {
                        navigate('/login', {
                            state: {
                                successMessage: 'Usuario registrado exitosamente. Por favor, inicie sesión.'
                            }
                        });
                    }, 2000);
                } else {
                    setErrors({
                        backend: result.error || 'Error en el registro'
                    });
                    // Mostrar toast de error
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.error || 'Error en el registro',
                        life: 3000
                    });
                }
            } catch (error) {
                setErrors({
                    backend: error.detail || error.message || 'Error en el servidor, intenta más tarde.'
                });
                // Mostrar toast de error
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.detail || error.message || 'Error en el servidor, intenta más tarde.',
                    life: 3000
                });
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="flex justify-content-center pt-5">
            <Card className="w-full md:w-8 lg:w-6">
                <h2 className="text-center mb-2">Registro de Usuario</h2>

                {/* Botón de login reubicado */}
                <div className="flex justify-content-center mb-4">
                    <Button
                        label="¿Ya tenés cuenta? Iniciar sesión"
                        link
                        onClick={() => navigate('/login')}
                        className="text-sm"
                    />
                </div>

                <div className="border-bottom-1 border-300 mb-4"></div>

                {errors.backend && (
                    <Message severity="error" text={errors.backend} className="mb-3"/>
                )}

                <Stepper ref={stepperRef} className="w-full">
                    {/* DATOS PERSONALES */}
                    <StepperPanel header="Datos Personales">
                        <div className="flex flex-column gap-5">
                            <span className="p-float-label w-full">
                                <InputText
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className={errors.nombre && 'p-invalid'}
                                />
                                <label htmlFor="nombre">Nombre completo</label>
                                {errors.nombre && <small className="p-error block">{errors.nombre}</small>}
                            </span>

                            <span className="p-float-label w-full">
                                <InputText
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email && 'p-invalid'}
                                />
                                <label htmlFor="email">Correo electrónico</label>
                                {errors.email && <small className="p-error block">{errors.email}</small>}
                            </span>

                            <span className="p-float-label w-full">
                                <Password
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    toggleMask
                                    feedback={true}
                                    inputClassName="w-full"
                                    className={errors.password && 'p-invalid'}
                                />
                                <label htmlFor="password">Contraseña</label>
                                {errors.password && <small className="p-error block">{errors.password}</small>}
                            </span>

                            <span className="p-float-label w-full">
                                <InputText
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                                <label htmlFor="telefono">Teléfono (opcional)</label>
                            </span>
                        </div>

                        <div className="flex justify-content-end mt-4">
                            <Button
                                label="Siguiente"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={() => {
                                    if (validateStep(0)) stepperRef.current.nextCallback();
                                }}
                            />
                        </div>
                    </StepperPanel>

                    {/* DOMICILIO Y UBICACIÓN */}
                    <StepperPanel header="Domicilio y Ubicación">
                        <div className="flex flex-column gap-5">
                            <span className="p-float-label">
                                <InputText
                                    id="direccion"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className={errors.direccion && 'p-invalid'}
                                />
                                <label htmlFor="direccion">Dirección</label>
                                {errors.direccion && <small className="p-error">{errors.direccion}</small>}
                            </span>

                            <span className="p-float-label">
                                <InputText
                                    id="codigo_postal"
                                    name="codigo_postal"
                                    value={formData.codigo_postal}
                                    onChange={handleChange}
                                    className={errors.codigo_postal && 'p-invalid'}
                                />
                                <label htmlFor="codigo_postal">Código Postal</label>
                                {errors.codigo_postal && <small className="p-error">{errors.codigo_postal}</small>}
                            </span>

                            <span className="p-float-label">
                                <InputText
                                    id="ciudad"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className={errors.ciudad && 'p-invalid'}
                                />
                                <label htmlFor="ciudad">Ciudad</label>
                                {errors.ciudad && <small className="p-error">{errors.ciudad}</small>}
                            </span>

                            <ProvinciaSelect
                                value={formData.provincia}
                                onChange={handleChange}
                                error={!!errors.provincia}
                                helperText={errors.provincia}
                            />
                        </div>

                        <div className="flex justify-content-between mt-4">
                            <Button
                                label="Volver"
                                icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}
                                className="p-button-secondary"
                            />
                            <Button
                                label="Registrarse"
                                icon="pi pi-check"
                                onClick={handleRegisterSubmit}
                                disabled={loading}
                                className="p-button-primary" // Añade esta clase para consistencia
                            />

                        </div>

                        {loading && (
                            <div className="flex justify-content-center mt-3">
                                <ProgressSpinner style={{width: '40px', height: '40px'}} strokeWidth="5"/>
                            </div>
                        )}
                    </StepperPanel>
                </Stepper>
            </Card>
        </div>
    );
}