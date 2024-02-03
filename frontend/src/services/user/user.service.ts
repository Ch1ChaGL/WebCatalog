import { IUserUpdate } from '../../store/user/user.interface';
import { Ban } from './../../types/ban.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { IUser } from './../../types/user.interface';
import { UserEndPoint } from './user.config';
export const UserService = {
  async getUserById(userId: string): Promise<IUser> {
    const response = await instance<IUser>(
      createRequestConfig(
        HttpMethods.GET,
        UserEndPoint.GET_USER_BY_ID,
        null,
        userId,
      ),
    );

    return response.data;
  },

  async getAllUser(): Promise<IUser[]> {
    const response = await instance<IUser[]>(
      createRequestConfig(HttpMethods.GET, UserEndPoint.GET_USERS),
    );

    return response.data;
  },

  async banUserToggle(data: Ban, userId: string): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.PATCH,
        UserEndPoint.BUN_USER_TOGGLE,
        data,
        userId,
      ),
    );

    return response.data;
  },

  async updateUser(
    data: Omit<IUserUpdate, 'userId'>,
    userId: string,
  ): Promise<IUser> {
    const response = await instance<IUser>(
      createRequestConfig(
        HttpMethods.PATCH,
        UserEndPoint.UPDATE_USER_PATCH,
        data,
        userId,
      ),
    );
    console.log('я отправил запрос');
    return response.data;
  },
};
