import { AsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './user.interface';
import { checkAuth, login, logout, register } from './user.action';
import { getLocalStorage } from '@/utils/local-storage';

export const initialState: IInitialState = {
  user: getLocalStorage('user'),
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(register.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload.response.data.message;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload.response.data.message;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(checkAuth.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload.response.data.message; // Extracting and storing only the error message
      })
      .addCase(logout.pending, state => {
        state.user = null;
      });
  },
});
