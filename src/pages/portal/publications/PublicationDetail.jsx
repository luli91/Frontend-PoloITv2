import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const PublicationDetail = () => {
    const { id } = useParams(); //  Obtiene el ID desde la URL
    const { token } = useAuth();
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await fetch(`${urlbackend}/publicaciones/${id}`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Error al obtener la publicación");

                const data = await response.json();
                setPublication(data);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPublication();
    }, [id, token]);

    if (!publication) return <p>Cargando publicación...</p>;

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5">{publication.mensaje}</Typography>
                    <Typography variant="body2">Estado: {publication.estado}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PublicationDetail;
