import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authServices";

// THUNK: Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue, dispatch }) => {
      try {
          const response = await authService.login(credentials);

          console.log("✅ Respuesta completa recibida en loginUser:", JSON.stringify(response, null, 2));

          if (!response.token || !response.user) {
              throw new Error("⚠️ No se recibió usuario válido en la respuesta.");
          }

          dispatch(setAuthToken(response.token));
          return { user: response.user, token: response.token };
      } catch (err) {
          console.error("❌ Error en loginUser:", err);
          return rejectWithValue(err.message || "Error en login");
      }
  }
);

// THUNK: Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Error en registro");
    }
  }
);

const storedUser = localStorage.getItem("user");

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("authToken") || "",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = "";
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
        },
        setAuthToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("authToken", action.payload);  
        },
        setUser: (state, action) => { 
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
    },

    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("authToken", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setAuthToken, setUser } = authSlice.actions;

export default authSlice.reducer;

