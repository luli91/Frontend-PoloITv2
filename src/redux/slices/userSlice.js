import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        selectedUser: null,
        loading: false, //  Estado para indicar cuando se están cargando datos
        error: null, //  Estado para manejar errores
    },
    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload;
            state.loading = false; // Se terminó de cargar la lista
            state.error = null; // Limpia errores si hubo éxito
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removeUser: (state, action) => {
            state.list = state.list.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, setSelectedUser, setLoading, setError, removeUser } = userSlice.actions;
export default userSlice.reducer;

//Maneja el estado de los usuarios en Redux.
// Redux manejará la lista de usuarios y el usuario seleccionado.