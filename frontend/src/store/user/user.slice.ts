import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './user.interface';
import { checkAuth, login, logout, register } from './user.action';
import { getLocalStorage } from '@/utils/local-storage';

export const initialState: IInitialState = {
  user: getLocalStorage('user'),
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(checkAuth.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload.message; // Extracting and storing only the error message
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});
