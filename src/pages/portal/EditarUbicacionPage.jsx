import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actualizarUbicacionThunk, obtenerMiUbicacionThunk } from "../../redux/slices/ubicacionSlice";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import FormularioUbicacion from "../../components/FormularioUbicacion";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAuth } from '../../context/AuthContext';


const EditarUbicacionPage = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ubicacion, loading } = useSelector((state) => state.ubicacion);

  const [formData, setFormData] = useState({
    direccion: "",
    ciudad: "",
    codigo_postal: "",
    provincia: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(obtenerMiUbicacionThunk());
  }, [dispatch]);

  useEffect(() => {
    if (ubicacion) {
      setFormData({ ...ubicacion });
    }
  }, [ubicacion]);

  const validar = () => {
    const e = {};
    if (!formData.direccion) e.direccion = "Requerido";
    if (!formData.ciudad) e.ciudad = "Requerido";
    if (!formData.codigo_postal) e.codigo_postal = "Requerido";
    if (!formData.provincia) e.provincia = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;
    try {
      await dispatch(actualizarUbicacionThunk({ id: ubicacion?.id, data: formData })).unwrap();
      await checkAuth();
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
    }
  };

  return (
    <div className="p-4">
      <Card title="Editar Ubicación">
        {loading ? (
          <ProgressSpinner />
        ) : (
          <>
            <FormularioUbicacion formData={formData} setFormData={setFormData} errors={errors} />
            <div className="flex justify-content-between mt-4">
              <Button label="Cancelar" className="p-button-secondary" onClick={() => navigate("/dashboard/profile")} />
              <Button label="Guardar" icon="pi pi-check" onClick={handleGuardar} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default EditarUbicacionPage;
