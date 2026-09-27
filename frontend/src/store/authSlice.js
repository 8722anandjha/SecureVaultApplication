import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser } from "../services/authService";

export const login = createAsyncThunk(
    "auth/login",
    async (loginData, { rejectWithValue }) => {
        try {
            await loginUser(loginData);

            const user = await getCurrentUser();

            return user;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const user = await getCurrentUser();
            return user;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Not authenticated"
            );
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    initialized: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.initialized = true;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.initialized = true;
            })

            // Restore current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.initialized = true;
            })

            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.initialized = true;
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;