import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  loading: false,
  currentTheme:'ThemeTwo',
  token:localStorage.getItem('token') ? JSON.stringify(localStorage.getItem('token')) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUsers(state, value) {
      state.users = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setCurrentTheme(state,value){
      state.currentTheme = value.payload
    }
  },
});

export const { setSignupData, setLoading, setToken,setCurrentTheme } = authSlice.actions;

export default authSlice.reducer;