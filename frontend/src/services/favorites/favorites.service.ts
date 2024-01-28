import { IPost } from './../../types/post.interface';
import { IToglleFavorites } from './favorites.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { FavoritesEndPoint } from './favorites.config';

export const FavoritesService = {
  async add(data: IToglleFavorites): Promise<void> {
    const response = await instance(
      createRequestConfig(
        HttpMethods.POST,
        FavoritesEndPoint.ADD_FAVORITES,
        data,
      ),
    );
  },

  async delete(data: IToglleFavorites): Promise<void> {
    const response = await instance<IPost>(
      createRequestConfig(
        HttpMethods.DELETE,
        FavoritesEndPoint.DELETE_FAVORITES,
        data,
      ),
    );
  },

  async getFavoritesUserPost(userId: string): Promise<IPost[]> {
    const response = await instance<IPost[]>(
      createRequestConfig(
        HttpMethods.GET,
        FavoritesEndPoint.GET_FAVORITES_USER_POST,
        null,
        userId,
      ),
    );

    return response.data;
  },

  async isFavorites(data: {
    userId: number;
    postId: number;
  }): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.POST,
        FavoritesEndPoint.IS_FAVORITES,
        data,
      ),
    );

    return response.data;
  },

  async ToggleFavorites(data: {
    userId: number;
    postId: number;
  }): Promise<void> {
    const response = await instance<void>(
      createRequestConfig(
        HttpMethods.POST,
        FavoritesEndPoint.TOGGLE_FAVORITES,
        data,
      ),
    );
  },
};
