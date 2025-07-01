import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicacionesDetalle, quieroDonar } from "../../redux/slices/publicacionesSlice";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

export default function PublicacionesVistaGrid() {
    const dispatch = useDispatch();
    const [pageState, setPageState] = useState(0);
    const { detalle } = useSelector((state) => state.publicaciones);
    const publicacionesVisibles = detalle.items?.filter((pub) => pub.visible) || [];

    const [visible, setVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [seleccionada, setSeleccionada] = useState(null);

    useEffect(() => {
        dispatch(getPublicacionesDetalle({ page: pageState + 1, perPage: detalle.perPage }));
    }, [dispatch, pageState]);

    const enviarCorreo = async () => {
        if (seleccionada) {
            await dispatch(quieroDonar(seleccionada.donacion.id));
            setVisible(false);
            setSuccessVisible(true);
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-5 text-center">Donaciones disponibles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {publicacionesVisibles.map((pub) => {
                    const imagen = pub.imagen_url || "https://via.placeholder.com/300x180?text=Sin+Imagen";
                    const estado = pub.estado_nombre || "—";
                    const severidad = {
                        activa: "success",
                        pendiente: "warning",
                        rechazada: "danger",
                        entregada: "danger"
                    }[estado.toLowerCase()] || "info";

                    return (
                        <Card
                            key={pub.id}
                            title={`Donación #${pub.donacion.id}`}
                            subTitle={pub.donacion.descripcion}
                            className="shadow-3"
                            header={<img src={imagen} alt="Imagen" className="w-full h-12rem object-cover" />}
                            footer={
                                <div className="flex justify-between items-center">
                                    <Tag value={estado} severity={severidad} />
                                    <Button
                                        label="Quiero donar"
                                        icon="pi pi-envelope"
                                        className="p-button-sm"
                                        onClick={() => {
                                            setSeleccionada(pub);
                                            setVisible(true);
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Divider className="my-2" />
                            <p className="m-0 text-sm line-clamp-3 overflow-hidden text-ellipsis" style={{ maxHeight: '4.5rem' }}>{pub.mensaje}</p>
                        </Card>
                    );
                })}
            </div>

            <Dialog
                visible={visible}
                header="Confirmar donación"
                modal
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                footer={
                    <div className="flex justify-end gap-2">
                        <Button label="Cancelar" icon="pi pi-times" severity="secondary" onClick={() => setVisible(false)} />
                        <Button label="Confirmar" icon="pi pi-check" onClick={enviarCorreo} autoFocus />
                    </div>
                }
            >
                <p>
                    Estás por enviar un correo a <strong>{seleccionada?.donacion?.usuario?.nombre || "el usuario"}</strong> indicando tu interés por la donación.
                </p>
            </Dialog>

            <Dialog
                visible={successVisible}
                header="📬 ¡Correo enviado!"
                modal
                style={{ width: "25rem" }}
                onHide={() => setSuccessVisible(false)}
                footer={<Button label="Aceptar" icon="pi pi-check" onClick={() => setSuccessVisible(false)} autoFocus />}
            >
                <p className="m-0">El mensaje fue enviado con éxito. Nos pondremos en contacto contigo pronto.</p>
            </Dialog>
        </div>
    );
}

