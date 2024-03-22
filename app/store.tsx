import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/authSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type APiDispatch = ReturnType<typeof store.dispatch>;
