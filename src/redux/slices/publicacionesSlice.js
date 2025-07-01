import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { publicacionesService } from "../../services/publicacionesServices";
import { notificacionesService } from "../../services/notificacionesService";

export const quieroDonar = createAsyncThunk(
    "publicaciones/quieroDonar",
    async (donacionId, { rejectWithValue }) => {
        try {
            return await notificacionesService.enviarCorreo(donacionId);
        } catch (err) {
            console.error("❌ Error al enviar correo:", err);
            return rejectWithValue(err.detail || "No se pudo enviar el correo");
        }
    }
);

export const getPublicacionesDetalle = createAsyncThunk(
    "publicaciones/getDetalle",
    async ({ page = 1, perPage = 10 }, { rejectWithValue }) => {
        try {
            return await publicacionesService.getDetalle(page, perPage);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al obtener publicaciones detalladas");

        }
    }
);

const initialState = {
    detalle: {
        items: [],
        total: 0,
        page: 1,
        perPage: 10,
    },

    loading: false,
    error: null,
};

const publicacionesSlice = createSlice({
    name: "publicaciones",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPublicacionesDetalle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPublicacionesDetalle.fulfilled, (state, action) => {
                state.loading = false;
                state.detalle.items = action.payload.items;
                state.detalle.total = action.payload.total;
                state.detalle.page = action.payload.page;
                state.detalle.perPage = action.payload.per_page;
                state.detalle.pages = action.payload.pages;
                state.detalle.has_next = action.payload.has_next;
                state.detalle.has_prev = action.payload.has_prev;
            })
            .addCase(getPublicacionesDetalle.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default publicacionesSlice.reducer;
