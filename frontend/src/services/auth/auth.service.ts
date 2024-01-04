import { IRegisterData, ILoginData } from './../../store/user/user.interface';
import { getContentType } from '@/app/api/api.helper';
import { IAuthResponse } from '@/store/user/user.interface';
import axios from 'axios';
import { saveToStorage } from './auth.helper';

export const AuthService = {
  async main(type: 'login' | 'registration', data: ILoginData | IRegisterData) {
    const response = await axios<IAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data,
    });

    if (response.data.accessToken) saveToStorage(response.data);

    response.data;
  },

  async getNewToken() {
    const response = await axios.get<string, { data: IAuthResponse }>(
      process.env.API_URL + 'auth/check',
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
