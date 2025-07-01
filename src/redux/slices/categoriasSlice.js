import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoriasService } from "../../services/categoriasService";

export const listarCategorias = createAsyncThunk(
  "categorias/listarCategorias",
  async (_, { rejectWithValue }) => {
    try {
      return await categoriasService.getAll();
    } catch (err) {
      return rejectWithValue(err.message || "Error al cargar categorías");
    }
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(listarCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriasSlice.reducer;
