import { ISocialNetworkResponse } from './socialNetwork.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { SocialNetworkEndPoint } from './socialNetwork.config';

export const SocialNetworkService = {
  async getAll(): Promise<ISocialNetworkResponse[]> {
    const response = await instance<ISocialNetworkResponse[]>(
      createRequestConfig(HttpMethods.GET, SocialNetworkEndPoint.GET_ALL),
    );

    return response.data;
  },

  async updateSocialNetwork(data: any) {
    const response = await instance(
      createRequestConfig(
        HttpMethods.PATCH,
        SocialNetworkEndPoint.UPDATE_SOCIALNETWORK,
        data,
      ),
    );

    return response.data;
  },
};
