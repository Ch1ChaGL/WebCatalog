import { IRate } from './../../store/rating/rating.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { RatingEndPoint } from './rating.config';

export const RatingService = {
  async rate(data: IRate): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(HttpMethods.POST, RatingEndPoint.RATE, data),
    );

    return response.data;
  },
  async getPostRating(postId: string): Promise<number> {
    const response = await instance<number>(
      createRequestConfig(
        HttpMethods.GET,
        RatingEndPoint.GET_RATE,
        null,
        postId,
      ),
    );

    return response.data;
  },
};
