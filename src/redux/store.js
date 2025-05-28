import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice.js";
import locationReducer from "./slices/locationSlice";
import adminReducer from "./slices/adminSlice";
import publicationsReducer from "./slices/publicationsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        admin: adminReducer,
        publications: publicationsReducer,
        location: locationReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;



//Este archivo administra el estado global de la aplicación. Redux almacena el usuario y token globalmente.