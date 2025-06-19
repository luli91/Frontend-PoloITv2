import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { donacionesService } from "../../services/donacionesService";

export const listarDonaciones = createAsyncThunk(
    "donaciones/listar",
    async (_, { rejectWithValue }) => {
        try {
            const response = await donacionesService.getAll();
            console.log("🔎 Respuesta del backend:", response);
            return response;
        } catch (err) {
            console.error("❌ Error al obtener donaciones:", err);
            return rejectWithValue(err.message || "Error al listar donaciones");
        }
    }
);


const donacionesSlice = createSlice({
    name: "donaciones",
    initialState: { lista: [], loading: false, error: null, seleccionadas: [] },
    reducers: {
        seleccionarDonacion: (state, action) => {
            if (!state.seleccionadas.includes(action.payload)) {
                state.seleccionadas.push(action.payload);
            } else {
                state.seleccionadas = state.seleccionadas.filter(id => id !== action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(listarDonaciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listarDonaciones.fulfilled, (state, action) => {
                state.loading = false;
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
