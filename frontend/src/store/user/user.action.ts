import { removeFromStorage } from './../../services/auth/auth.helper';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, ILoginData, IRegisterData } from './user.interface';
import { AuthService } from '@/services/auth/auth.service';
import { AuthEndPoint } from '@/services/auth/auth.config';
import { errorCatch } from '@/app/api/api.helper';
import { redirect } from 'next/navigation';

export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
  'auth/registration',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main(AuthEndPoint.Registration, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const clearError = createAction('user/clearError');

export const login = createAsyncThunk<IAuthResponse, ILoginData>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.main(AuthEndPoint.Login, data);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewToken();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (errorCatch(error) === 'jwt expired') {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);
