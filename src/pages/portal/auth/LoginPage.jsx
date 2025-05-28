import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';

const LoginPage = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await handleLogin(formData.email, formData.password);
            if (result.ok) {
                navigate('/perfil');
            } else {
                // Manejo de error más específico
                setError(formatErrorMessage(result.error));
            }
        } catch (error) {
            // Función auxiliar para formatear el mensaje de error
            setError(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    // Función auxiliar para formatear mensajes de error
    const formatErrorMessage = (error) => {
        if (error?.detail && Array.isArray(error.detail)) {
            // Si es un error de validación del backend
            return error.detail[0]?.msg || 'Error de validación';
        }
        if (typeof error === 'string') {
            return error;
        }
        if (error?.message) {
            return error.message;
        }
        return 'Error al intentar iniciar sesión';
    };


    return (
        <div className="flex justify-content-center align-items-center min-h-screen p-4 bg-gradient-to-br from-green-400 to-green-100">
            <Card className="w-full md:w-19rem shadow-2 !bg-white/90 backdrop-blur-sm">
                <div className="flex flex-column gap-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-900 mb-2">
                            Iniciar Sesión
                        </h2>
                    </div>

                    {error && (
                        <Message
                            severity="error"
                            text={error}
                            className="w-full"
                        />
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                        <div className="field">
                            <span className="p-float-label w-full">
                                <InputText
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full ${error ? 'p-invalid' : ''}`}
                                    required
                                />
                                <label htmlFor="email">Correo electrónico</label>
                            </span>
                        </div>

                        <div className="field">
                            <span className="p-float-label w-full">
                                <Password
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    toggleMask
                                    feedback={false}
                                    className={`w-full ${error ? 'p-invalid' : ''}`}
                                    inputClassName="w-full"
                                    required
                                />
                                <label htmlFor="password">Contraseña</label>
                            </span>
                        </div>

                        <Button
                            type="submit"
                            label={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            icon="pi pi-check"
                            loading={loading}
                            className="w-full"
                        />

                        <div className="text-center">
                            <p className="text-2">¿No tienes una cuenta?</p>
                            <Button
                                label="Regístrate Aquí"
                                severity="secondary"
                                raised
                                rounded
                                className="transition-colors transition-duration-150"
                                onClick={() => navigate('/register')}
                            />
                        </div>




                    </form>
                </div>
            </Card>

        </div>


    );
};

export default LoginPage;