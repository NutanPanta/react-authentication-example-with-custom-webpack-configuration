import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, refresh: null },
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.token = access;
      state.refresh = refresh;
    },
    logout: (state, action) => {
      state.token = null;
      state.refresh = null;
      localStorage.removeItem('access');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
