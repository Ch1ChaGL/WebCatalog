import { AxiosRequestConfig } from 'axios';
import { AuthEndPoint } from './auth/auth.config';
import { CategoryEndPoint } from './category/category.config';
import { getContentType } from '@/app/api/api.helper';
import { CommentEndPoint } from './comment/comment.config';
import { PostEndPoint } from './post/post.config';
import { RatingEndPoint } from './rating/rating.config';
import { UserEndPoint } from './user/user.config';
import { FavoritesEndPoint } from './favorites/favorites.config';
import { SocialNetworkEndPoint } from './socialNetwork/socialNetwork.config';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type typeEndPoint =
  | CategoryEndPoint
  | AuthEndPoint
  | CommentEndPoint
  | PostEndPoint
  | RatingEndPoint
  | UserEndPoint
  | FavoritesEndPoint
  | SocialNetworkEndPoint;

export const createRequestConfig = (
  method: HttpMethods,
  endPoint: typeEndPoint,
  data?: any,
  id?: string,
): AxiosRequestConfig => ({
  url: id ? endPoint + id : endPoint,
  method,
  data,
  headers: getContentType(),
});
