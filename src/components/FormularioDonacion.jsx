import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useToast } from "../hooks/useToast";
import { api } from "../services/apiServices";

export default function FormularioDonacion({ donacion = null, onGuardado }) {
  const toast = useToast();
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    descripcion: "",
    cantidad: "",
    categoria_id: ""
  });

  // Cargar categorías
  useEffect(() => {
    api.get("/categorias/")
      .then(res => setCategorias(res))
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar las categorías",
          life: 3000
        });
      });
  }, []);

  // Si es edición, precargar los valores
  useEffect(() => {
    if (donacion) {
      setFormData({
        descripcion: donacion.descripcion || "",
        cantidad: String(donacion.cantidad || ""),
        categoria_id: donacion.categoria_id || ""
      });
    }
  }, [donacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.descripcion || !formData.cantidad || !formData.categoria_id) {
      toast.current.show({
        severity: "warn",
        summary: "Campos obligatorios",
        detail: "Completá todos los campos antes de continuar",
        life: 3000
      });
      return;
    }

    const payload = {
      descripcion: formData.descripcion,
      cantidad: parseInt(formData.cantidad),
      categoria_id: formData.categoria_id
    };

    try {
      if (donacion) {
        // EDITAR
        await api.put(`/donaciones/${donacion.id}`, payload);
        toast.current.show({
          severity: "success",
          summary: "Donación actualizada",
          detail: "La donación fue editada correctamente",
          life: 3000
        });
      } else {
        // CREAR
        await api.post("/donaciones/", payload);
        toast.current.show({
          severity: "success",
          summary: "Donación creada",
          detail: "Se creó la donación exitosamente",
          life: 3000
        });
        setFormData({ descripcion: "", cantidad: "", categoria_id: "" });
      }

      onGuardado?.(); // Notificar al componente padre
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar la donación",
        life: 3000
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="p-float-label">
        <InputText
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <label htmlFor="descripcion">Descripción</label>
      </span>

      <span className="p-float-label">
        <InputText
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          keyfilter="int"
        />
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

      <Button
        label={donacion ? "Guardar cambios" : "Crear Donación"}
        icon={donacion ? "pi pi-save" : "pi pi-plus"}
        onClick={handleSubmit}
      />
    </div>
  );
}
