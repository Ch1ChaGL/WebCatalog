import { IComment } from './../../types/comment.interface';
import { ICommentCreateRequest } from './comment.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { CommentEndPoint } from './comment.config';

export const CommentService = {
  async create(data: ICommentCreateRequest): Promise<IComment> {
    const response = await instance<IComment>(
      createRequestConfig(HttpMethods.POST, CommentEndPoint.CREATE, data),
    );

    return response.data;
  },
  async getCommentByPostId(postId: string): Promise<IComment[]> {
    const response = await instance<IComment[]>(
      createRequestConfig(
        HttpMethods.GET,
        CommentEndPoint.GET_COMMENTS_BY_POST_ID,
        null,
        postId,
      ),
    );

    return response.data;
  },
};
