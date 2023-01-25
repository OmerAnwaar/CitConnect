import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userType = payload;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
