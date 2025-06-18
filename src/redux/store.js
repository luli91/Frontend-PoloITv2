import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import publicacionesReducer from "./slices/publicacionesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        publicaciones: publicacionesReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;



//Este archivo administra el estado global de la aplicación. Redux almacena el usuario y token globalmente.