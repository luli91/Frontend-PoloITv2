import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { misPublicacionesService } from "../../services/misPublicacionesService";

// Traer mis publicaciones paginadas
export const getMisPublicacionesPaginated = createAsyncThunk(
  "misPublicaciones/getPaginated",
  async ({ page, perPage }, { rejectWithValue }) => {
    try {
      return await misPublicacionesService.getPaginated(page, perPage);
    } catch (err) {
      return rejectWithValue(err.detail || "Error al obtener mis publicaciones");
    }
  }
);

// Editar publicación por donación
export const actualizarMiPublicacion = createAsyncThunk(
  "misPublicaciones/editar",
  async ({ publicacionId, data }, { rejectWithValue }) => {
    try {
      return await misPublicacionesService.editByPublicacion(publicacionId, data);
    } catch (err) {
      return rejectWithValue(err.detail || "Error al actualizar la publicación");
    }
  }
);

// Eliminar publicación propia
export const eliminarMiPublicacion = createAsyncThunk(
  "misPublicaciones/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await misPublicacionesService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.detail || "Error al eliminar la publicación");
    }
  }
);

//Ver detalle de la publicacion
export const verDetallePublicacion = createAsyncThunk(
  "misPublicaciones/getDetalle",
  async (id, { rejectWithValue }) => {
    try {
      return await publicacionesService.getById(id);
    } catch (err) {
      return rejectWithValue("No se pudo obtener el detalle de la publicación");
    }
  }
);


const initialState = {
  items: [],
  total: 0,
  page: 1,
  perPage: 10,
  loading: false,
  error: null,
};

const misPublicacionesSlice = createSlice({
  name: "misPublicaciones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMisPublicacionesPaginated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMisPublicacionesPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.perPage = action.payload.per_page;
      })
      .addCase(getMisPublicacionesPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(actualizarMiPublicacion.fulfilled, (state, action) => {
        const index = state.items.findIndex(pub => pub.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(eliminarMiPublicacion.fulfilled, (state, action) => {
        state.items = state.items.filter(pub => pub.id !== action.payload);
      });
  },
});

export const subirImagenPublicacion = createAsyncThunk(
    "misPublicaciones/uploadImage",
    async ({ publicacionId, file }, { rejectWithValue }) => {
        try {
            return await misPublicacionesService.uploadImage(publicacionId, file);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al subir la imagen");
        }
    }
);


export default misPublicacionesSlice.reducer;
