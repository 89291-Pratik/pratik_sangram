import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/apiConfig';

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/cart/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (reqData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/cart/add', reqData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartItemId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/cart/cart_items/${cartItemId}`);
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/cart/${cartItemId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: null,
  totalPrice: 0,
  totalItems: 0,
  totalDiscountedPrice: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cart = null;
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      state.totalDiscountedPrice = 0;
      state.discount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.cartItems = action.payload.cartItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.totalItems = action.payload.totalItem || 0;
        state.totalDiscountedPrice = action.payload.totalDiscountedPrice || 0;
        state.discount = action.payload.discount || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Refresh cart after adding item
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCart } = cartSlice.actions;
export default cartSlice.reducer;