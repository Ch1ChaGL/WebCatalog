import { removeFromStorage } from './../../services/auth/auth.helper';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAuthResponse,
  ILoginData,
  IRegisterData,
  IUserUpdate,
} from './user.interface';
import { AuthService } from '@/services/auth/auth.service';
import { AuthEndPoint } from '@/services/auth/auth.config';
import { errorCatch } from '@/app/api/api.helper';
import { IUser } from '@/types/user.interface';
import { UserService } from '@/services/user/user.service';

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

export const revalidateUser = createAsyncThunk<IUser, string>(
  'user/',
  async (userId, thunkAPI) => {
    try {
      const response = await UserService.getUserById(userId);
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

export const updateUserInformation = createAsyncThunk<IUser, IUserUpdate>(
  'users/',
  async (data, thunkAPI) => {
    try {
      const { userId, ...user } = data;
      console.log('я тут');
      const response = await UserService.updateUser(user, String(userId));
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
