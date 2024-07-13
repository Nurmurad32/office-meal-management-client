// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_URL from '../../hooks/baseUrl';

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
    const response = await axios.get(`${base_URL}/profile`);
    return response.data;
});

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async (formData) => {
    const response = await axios.post(`${base_URL}/login`, { formData });
    return response.data;
});

// Async thunk for user logout
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const response = await axios.post(`${base_URL}/logout`);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
