import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicacionesService } from "../../services/publicacionesServices"; 

//  Obtener todas las publicaciones visibles
export const getPublicaciones = createAsyncThunk(
    "publicaciones/getPublicaciones",
    async (_, { rejectWithValue }) => {
        try {
            return await publicacionesService.getAll();
        } catch (err) {
            return rejectWithValue(err.detail || "Error al obtener publicaciones");
        }
    }
);

//  Obtener publicaciones del usuario autenticado
export const getMisPublicaciones = createAsyncThunk(
    "publicaciones/getMisPublicaciones",
    async (_, { rejectWithValue }) => {
        try {
            return await publicacionesService.getMine();
        } catch (err) {
            return rejectWithValue(err.detail || "Error al obtener publicaciones del usuario");
        }
    }
);

//  Obtener detalles de una publicación específica
export const getPublicacion = createAsyncThunk(
    "publicaciones/getPublicacion",
    async (id, { rejectWithValue }) => {
        try {
            return await publicacionesService.getById(id);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al obtener detalles de la publicación");
        }
    }
);

//  Crear nueva publicación
export const crearPublicacion = createAsyncThunk(
    "publicaciones/crearPublicacion",
    async (donacionId, { rejectWithValue }) => {
        try {
            console.log("➡️ Intentando crear publicación con donación ID:", donacionId);

            const response = await publicacionesService.create(donacionId);

            console.log("✅ Publicación creada con éxito:", response);
            return response;
        } catch (err) {
            console.error("❌ Error al crear la publicación:", err);
            return rejectWithValue(err.detail || "Error al crear la publicación");
        }
    }
);


//  Editar publicación
export const editarPublicacion = createAsyncThunk(
    "publicaciones/editarPublicacion",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await publicacionesService.edit(id, data);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al editar la publicación");
        }
    }
);

//  Cambiar estado de publicación
export const actualizarEstadoPublicacion = createAsyncThunk(
    "publicaciones/actualizarEstadoPublicacion",
    async ({ id, estado }, { rejectWithValue }) => {
        try {
            return await publicacionesService.updateStatus(id, estado);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al actualizar el estado de la publicación");
        }
    }
);

//  Eliminar publicación
export const eliminarPublicacion = createAsyncThunk(
    "publicaciones/eliminarPublicacion",
    async (id, { rejectWithValue }) => {
        try {
            return await publicacionesService.delete(id);
        } catch (err) {
            return rejectWithValue(err.detail || "Error al eliminar la publicación");
        }
    }
);

const initialState = {
    publicaciones: [],
    misPublicaciones: [],
    publicacion: null,
    loading: false,
    error: null,
};

const publicacionesSlice = createSlice({
    name: "publicaciones",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //  Obtener todas las publicaciones visibles
            .addCase(getPublicaciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPublicaciones.fulfilled, (state, action) => {
                state.loading = false;
                state.publicaciones = action.payload;
            })
            .addCase(getPublicaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Obtener publicaciones del usuario autenticado
            .addCase(getMisPublicaciones.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMisPublicaciones.fulfilled, (state, action) => {
                state.loading = false;
                state.misPublicaciones = action.payload;
            })
            .addCase(getMisPublicaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Obtener detalles de una publicación específica
            .addCase(getPublicacion.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPublicacion.fulfilled, (state, action) => {
                state.loading = false;
                state.publicacion = action.payload;
            })
            .addCase(getPublicacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Crear nueva publicación
            .addCase(crearPublicacion.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearPublicacion.fulfilled, (state, action) => {
                state.loading = false;
                state.publicaciones.push(action.payload); // Agregar la nueva publicación a la lista
            })
            .addCase(crearPublicacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Editar publicación
            .addCase(editarPublicacion.pending, (state) => {
                state.loading = true;
            })
            .addCase(editarPublicacion.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.publicaciones.findIndex(pub => pub.id === action.payload.id);
                if (index !== -1) {
                    state.publicaciones[index] = action.payload; // Actualizar publicación
                }
            })
            .addCase(editarPublicacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Cambiar estado de publicación
            .addCase(actualizarEstadoPublicacion.pending, (state) => {
                state.loading = true;
            })
            .addCase(actualizarEstadoPublicacion.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.publicaciones.findIndex(pub => pub.id === action.payload.id);
                if (index !== -1) {
                    state.publicaciones[index].estado = action.payload.estado; // Actualizar estado
                }
            })
            .addCase(actualizarEstadoPublicacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //  Eliminar publicación
            .addCase(eliminarPublicacion.pending, (state) => {
                state.loading = true;
            })
            .addCase(eliminarPublicacion.fulfilled, (state, action) => {
                state.loading = false;
                state.publicaciones = state.publicaciones.filter(pub => pub.id !== action.meta.arg);
            })
            .addCase(eliminarPublicacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default publicacionesSlice.reducer;
