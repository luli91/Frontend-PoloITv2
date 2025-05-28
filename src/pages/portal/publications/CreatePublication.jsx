import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePublication = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ mensaje: "", donacion_id: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${urlbackend}/publicaciones/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail);
                return;
            }

            navigate("/publicaciones"); // Redirige después de publicar

        } catch (error) {
            console.error("Error al publicar:", error);
            setError("Hubo un problema al crear la publicación");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Crear Publicación</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Mensaje" name="mensaje" variant="outlined" margin="normal" value={formData.mensaje} onChange={handleChange} />
                <TextField fullWidth label="ID de Donación" name="donacion_id" variant="outlined" margin="normal" value={formData.donacion_id} onChange={handleChange} />
                {error && <Typography color="error">{error}</Typography>}
                <Button variant="contained" color="primary" fullWidth type="submit">Publicar</Button>
            </form>
        </Container>
    );
};

export default CreatePublication;
