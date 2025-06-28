import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicacionesService } from "../../services/publicacionesServices";

// 🔹 Obtener publicaciones detalladas (paginadas, visibles)
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
        state.detalle = action.payload;
      })
      .addCase(getPublicacionesDetalle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default publicacionesSlice.reducer;
