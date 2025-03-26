import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, user: null, users: [] },
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload); // Store user details in Redux state
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        state.isAuthenticated = true;
        state.user = existingUser;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
