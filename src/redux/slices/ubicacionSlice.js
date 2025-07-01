import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ubicacionService } from "../../services/ubicacionService";

export const obtenerMiUbicacionThunk = createAsyncThunk(
  "ubicacion/obtenerMiUbicacion",
  async (_, { rejectWithValue }) => {
    try {
      return await ubicacionService.getUbicacionActual();
    } catch (err) {
      return rejectWithValue(err.detail || "Error al obtener ubicación");
    }
  }
);

export const actualizarUbicacionThunk = createAsyncThunk(
  "ubicacion/actualizarUbicacion",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await ubicacionService.actualizarUbicacion(id, data);
    } catch (err) {
      return rejectWithValue(err.detail || "Error al actualizar ubicación");
    }
  }
);

const ubicacionSlice = createSlice({
  name: "ubicacion",
  initialState: {
    ubicacion: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerMiUbicacionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerMiUbicacionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ubicacion = action.payload;
      })
      .addCase(obtenerMiUbicacionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(actualizarUbicacionThunk.fulfilled, (state, action) => {
        state.ubicacion = action.payload;
      });
  }
});

export default ubicacionSlice.reducer;
