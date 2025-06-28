import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { donacionesService } from "../../services/donacionesService";

// Thunk para listar donaciones con paginación
export const listarDonaciones = createAsyncThunk(
    "donaciones/listar",
    async (params, { rejectWithValue }) => {
        try {
            const page = params?.page || 1;
            const perPage = params?.perPage || 10;

            const data = await donacionesService.getAll(page, perPage);
            console.log("📦 Donaciones recibidas del backend (en thunk):", data);

            // Verificar estructura esperada
            if (!data || !Array.isArray(data.items)) {
                console.error("⚠️ Estructura inesperada:", data);
                throw new Error("La respuesta no contiene 'items'");
            }

            return data;
        } catch (err) {
            console.error("❌ Error al obtener donaciones (thunk):", err);
            return rejectWithValue(err.message || "Error al listar donaciones");
        }
    }
);






// Slice de Redux
const donacionesSlice = createSlice({
    name: "donaciones",
    initialState: {
        lista: {
            items: [],
            total: 0,
            page: 1,
            per_page: 10,
            pages: 0,
            has_next: false,
            has_prev: false,
        },
        loading: false,
        error: null,
        seleccionadas: [],
    },
    reducers: {
        seleccionarDonacion: (state, action) => {
            if (!state.seleccionadas.includes(action.payload)) {
                state.seleccionadas.push(action.payload);
            } else {
                state.seleccionadas = state.seleccionadas.filter(
                    (id) => id !== action.payload
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(listarDonaciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listarDonaciones.fulfilled, (state, action) => {
                state.loading = false;
                console.log("📦 action.payload en fulfilled:", action.payload);
                state.lista = action.payload;
                console.log("✅ Lista de donaciones actualizada:", state.lista);
            })
            .addCase(listarDonaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { seleccionarDonacion } = donacionesSlice.actions;
export default donacionesSlice.reducer;
