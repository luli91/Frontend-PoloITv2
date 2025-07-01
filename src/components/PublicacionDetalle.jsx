import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicacionesService } from "../services/publicacionesServices";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

export default function PublicacionDetalle() {
  const { id } = useParams();
  const [publi, setPubli] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicacionesService.getById(id)
      .then((res) => setPubli(res))
      .catch(() => setError("No se pudo cargar la publicación"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center p-8"><ProgressSpinner /></div>;
  if (error) return <Message severity="error" text={error} />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">📢 {publi.mensaje || "Sin mensaje"}</h2>
      <p><strong>Estado:</strong> {publi.estado}</p>
      <p><strong>Fecha publicación:</strong> {new Date(publi.fecha_publicacion).toLocaleString()}</p>
      <p><strong>Visible:</strong> {publi.visible ? "Sí" : "No"}</p>
      <p><strong>Donación:</strong> {publi.donacion?.descripcion} ({publi.donacion?.cantidad})</p>
      <p><strong>Ubicación:</strong> {publi.donacion?.usuario?.ubicacion?.ciudad}</p>
    </div>
  );
}
