import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { estadosService } from "../../services/estadosService";

// Thunk para obtener todos los estados
export const obtenerEstados = createAsyncThunk(
    "estados/obtener",
    async (_, { rejectWithValue }) => {
        try {
            const data = await estadosService.getAll();

            if (!Array.isArray(data)) {
                throw new Error("La respuesta no es un array de estados");
            }

            // Devuelve solo objetos planos
            return data.map((e) => ({
                id: e.id,
                nombre: e.nombre
            }));
        } catch (err) {
            return rejectWithValue(err.message || "Error al obtener estados");
        }
    }
);

// Slice de Redux
const estadosSlice = createSlice({
    name: "estados",
    initialState: {
        lista: [],
        estadoActual: null,
        loading: false,
        error: null,
        cargado: false
    },
    reducers: {
        limpiarError: (state) => {
            state.error = null;
        },
        seleccionarEstado: (state, action) => {
            const estadoId = action.payload;
            state.estadoActual = state.lista.find(estado => estado.id === estadoId) || null;
        },
        limpiarEstadoActual: (state) => {
            state.estadoActual = null;
        },
        resetearEstados: (state) => {
            state.lista = [];
            state.estadoActual = null;
            state.loading = false;
            state.error = null;
            state.cargado = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerEstados.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(obtenerEstados.fulfilled, (state, action) => {
                state.loading = false;
                state.lista = action.payload;
                state.cargado = true;
            })
            .addCase(obtenerEstados.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.cargado = false;
            });
    }
});

export const {
    limpiarError,
    seleccionarEstado,
    limpiarEstadoActual,
    resetearEstados
} = estadosSlice.actions;

export default estadosSlice.reducer;
