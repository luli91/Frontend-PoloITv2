import UserForm from "../../components/UserForm.jsx";
import LocationForm from "../../components/LocationForm.jsx";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const EditProfilePage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/perfil"); 
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, padding: 3 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>Editar Perfil</Typography>
                <UserForm />
                <LocationForm />
                <Button variant="contained" color="secondary" fullWidth onClick={handleBack}>
                    Volver al Perfil
                </Button>
            </CardContent>
        </Card>
    );
};

export default EditProfilePage;
