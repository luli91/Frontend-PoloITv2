import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
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
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, setSelectedUser, setLoading, setError, removeUser } = adminSlice.actions;
export default adminSlice.reducer;

// El objetivo de este archivo es manejar la lista de usuarios, eliminación de usuarios y estado de carga.