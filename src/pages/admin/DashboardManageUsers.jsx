import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { userService } from '../../services/userServices.js';
import { ProgressSpinner } from 'primereact/progressspinner';
import CreateUserDialog from '../../pages/portal/CreateUserDialog.jsx';


const DashboardManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (err) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: err.detail || err.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const confirmDeleteUser = (user) => {
        confirmDialog({
            message: `¿Estás seguro que querés eliminar al usuario "${user.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptClassName: 'p-button-danger',
            accept: () => deleteUser(user),
            reject: () => {
                toast.current.show({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada' });
            }
        });
    };

    const deleteUser = async (user) => {
        try {
            await userService.deleteById(user.id);
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            toast.current.show({ severity: 'success', summary: 'Eliminado', detail: `Usuario "${user.nombre}" eliminado correctamente` });
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.detail || err.message });
        }
    };

    const actionBodyTemplate = (rowData) => (
        <Button icon="pi pi-trash" severity="danger" rounded outlined onClick={() => confirmDeleteUser(rowData)} />
    );

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />

            <CreateUserDialog
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}
                onSuccess={loadUsers}
            />

            <h2 className="mb-3">Administración de Usuarios</h2>

            <Toolbar className="mb-4" left={() => (
                <Button label="Crear Usuario" icon="pi pi-plus" onClick={() => setVisibleDialog(true)} />
            )} />

            {loading ? (
                <div className="flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <ProgressSpinner />
                </div>
            ) : (
                <DataTable
                    value={users}
                    dataKey="id"
                    paginator
                    rows={10}
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                    showGridlines
                >
                    <Column field="id" header="ID" />
                    <Column field="nombre" header="Nombre" />
                    <Column field="email" header="Email" />
                    <Column field="telefono" header="Teléfono" />
                    <Column field="rol" header="Rol" />
                    <Column body={actionBodyTemplate} header="Acciones" />
                </DataTable>
            )}
        </div>
    );
};

export default DashboardManageUsers;
