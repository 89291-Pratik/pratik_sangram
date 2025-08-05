import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  jwt: localStorage.getItem('jwt') || null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('jwt');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = !!action.payload.jwt;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = !!action.payload.jwt;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;