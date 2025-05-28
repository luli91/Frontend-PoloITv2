import { createSlice } from "@reduxjs/toolkit";

const publicationsSlice = createSlice({
    name: "publications",
    initialState: {
        list: [],
        selectedPublication: null,
        loading: false,
        error: null,
    },
    reducers: {
        setPublications: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        },
        setSelectedPublication: (state, action) => {
            state.selectedPublication = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removePublication: (state, action) => {
            state.list = state.list.filter(pub => pub.id !== action.payload);
        },
    },
});

export const { setPublications, setSelectedPublication, setLoading, setError, removePublication } = publicationsSlice.actions;
export default publicationsSlice.reducer;

//El objetivo de publicationsSlice es manejar publicaciones, creación, eliminación y estado de carga.