import { InputText } from 'primereact/inputtext';
import ProvinciaSelect from './ProvinciaSelect'; 
import React from 'react';

const FormularioUbicacion = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
  );
};

export default FormularioUbicacion;
