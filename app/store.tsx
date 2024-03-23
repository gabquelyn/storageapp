import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/authSlice";
import { apiSlice } from "./api/apiSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type APiDispatch = ReturnType<typeof store.dispatch>;
