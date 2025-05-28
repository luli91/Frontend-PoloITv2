import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domicilio: "",
    altura: "",
    codigo_postal: "",
    ciudad: "",
    provincia: "",
    pais: ""
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateLocation: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setLocation, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
