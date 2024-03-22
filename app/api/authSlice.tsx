import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.accessToken = null;
    },
  },
});

export default authSlice;
export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

