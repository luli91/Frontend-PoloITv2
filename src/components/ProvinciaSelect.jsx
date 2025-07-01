import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const ProvinciaSelect = ({ value, onChange, error, helperText, name = 'provincia' }) => {
    const [provincias, setProvincias] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
                const data = await response.json();
                const nombres = data.provincias.map(p => p.nombre);
                setProvincias(nombres);
            } catch (err) {
                console.error("Error al obtener provincias:", err);
            }
        };
        fetchProvincias();
    }, []);

    // Sincroniza cuando cambia desde el padre
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const search = (e) => {
        const query = e.query.toLowerCase();
        const filteredItems = provincias.filter(p => p.toLowerCase().includes(query));
        setFiltered(filteredItems);
    };

    const handleChange = (e) => {
        setInputValue(e.value);
    };

    const handleBlur = () => {
        const isValid = provincias.includes(inputValue);
        if (isValid) {
            onChange({ target: { name, value: inputValue } });
        } else {
            setInputValue('');
            onChange({ target: { name, value: '' } });
        }
    };

    return (
        <div className="field">
            <label htmlFor={name} className="block mb-2">Provincia</label>
            <AutoComplete
                id={name}
                name={name}
                value={inputValue}
                suggestions={filtered}
                completeMethod={search}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribí una provincia"
                className={`w-full ${error ? 'p-invalid' : ''}`}
            />
            {error && <small className="p-error">{helperText}</small>}
        </div>
    );
};

export default ProvinciaSelect;
