import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const AllPublications = () => {
    const [publications, setPublications] = useState([]);
    const { token } = useAuth(); // obtener el token para autenticación

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await fetch(`${urlbackend}/publicaciones/`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Error al obtener publicaciones");

                const data = await response.json();
                setPublications(data);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPublications();
    }, [token]);

    return (
        <Container>
            <Typography variant="h4">Publicaciones Disponibles</Typography>
            {publications.map(pub => (
                <Card key={pub.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{pub.mensaje}</Typography>
                        <Typography variant="body2">Estado: {pub.estado}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default AllPublications;
