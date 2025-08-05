import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import adminOrderSlice from './slices/adminOrderSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
    adminOrder: adminOrderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;