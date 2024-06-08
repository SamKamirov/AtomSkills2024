import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

export const SliceNames = {
  AppData: 'AppData'
};

export const loginAction = createAsyncThunk(
  'login',
  async ({ login, password }) => {
    localStorage.setItem('user', JSON.stringify({ login, password }))
    return { login, password };
  }
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
  async () => {
    return mockUser;
  }
)

const initialState = {
  loading: false,
  user: null
};

const mockUser = {
  login: 'admin',
  password: 'admin'
};

const AppData = createSlice({
  name: SliceNames.AppData,
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;

      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
        state.user = null
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
})

export default AppData.reducer;
