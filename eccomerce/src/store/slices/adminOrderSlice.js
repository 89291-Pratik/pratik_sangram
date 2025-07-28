import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/apiConfig';

// Async thunks
export const fetchAllOrders = createAsyncThunk(
  'adminOrder/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/admin/orders/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  'adminOrder/confirmOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const shipOrder = createAsyncThunk(
  'adminOrder/shipOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${orderId}/ship`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deliverOrder = createAsyncThunk(
  'adminOrder/deliverOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'adminOrder/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/admin/orders/${orderId}/delete`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  confirmed: null,
  shipped: null,
  delivered: null,
  deletedOrder: null,
};

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state) => {
      state.confirmed = null;
      state.shipped = null;
      state.delivered = null;
      state.deletedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Confirm Order
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.confirmed = action.payload;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Ship Order
      .addCase(shipOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(shipOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shipped = action.payload;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(shipOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Deliver Order
      .addCase(deliverOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delivered = action.payload;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deletedOrder = action.payload;
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStatus } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;