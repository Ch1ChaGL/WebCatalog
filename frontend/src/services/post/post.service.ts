import { IPost } from './../../types/post.interface';
import { IPostCreate, PostUpdate } from './post.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { PostEndPoint } from './post.config';

export interface IPosts {
  currentPage: number;
  totalPosts: number;
  totalPages: number;
  posts: IPost[];
}
export const PostService = {
  async create(data: IPostCreate): Promise<IPost> {
    const formData = new FormData();

    // Добавляем поля из IPostCreate в FormData
    formData.append('postName', data.postName);
    formData.append('banned', JSON.stringify(data.banned));
    formData.append('description', data.description);
    formData.append('link', data.link);
    formData.append('categoryIds', JSON.stringify(data.categoryIds));
    formData.append('userId', JSON.stringify(data.userId));

    // Добавляем файлы, если они есть
    if (data.images && data.images.length > 0) {
      data.images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await instance<IPost>({
      method: HttpMethods.POST,
      url: PostEndPoint.CREATE,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async updatePostImage(data: { images: File[]; postId: string }) {
    const formData = new FormData();

    // Добавляем файлы, если они есть
    if (data.images && data.images.length > 0) {
      data.images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await instance<IPost>({
      method: HttpMethods.PATCH,
      url: PostEndPoint.UPDATE + data.postId,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async getPost(postId: string): Promise<IPost> {
    const response = await instance<IPost>(
      createRequestConfig(
        HttpMethods.GET,
        PostEndPoint.GET_POST_BY_ID,
        null,
        postId,
      ),
    );

    return response.data;
  },

  async getPosts(
    page: number,
    limit: number,
    query: string = '',
  ): Promise<IPosts> {
    const endPoint =
      PostEndPoint.GET_ALL_POSTS +
      `?page=${page}&limit=${limit}&query=${query !== '' ? query : ''}`;

    const response = await instance<IPosts>(
      createRequestConfig(
        HttpMethods.GET,
        endPoint as PostEndPoint.GET_ALL_POSTS,
      ),
    );

    return response.data;
  },

  async toggleBanPost(postId: string): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.PATCH,
        PostEndPoint.TOGGLE_BAN,
        null,
        postId,
      ),
    );

    return response.data;
  },

  async updatePost(postId: string, data: PostUpdate): Promise<IPost> {
    const response = await instance<IPost>(
      createRequestConfig(HttpMethods.PATCH, PostEndPoint.UPDATE, data, postId),
    );

    return response.data;
  },

  async deletePost(postId: string): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.DELETE,
        PostEndPoint.DELETE,
        { a: 1 },
        postId,
      ),
    );
    return response.data;
  },

  async getPostsByUserId(userId: number): Promise<IPost[]> {
    const response = await instance<IPost[]>(
      createRequestConfig(
        HttpMethods.GET,
        PostEndPoint.GET_POST_BY_USER_ID,
        null,
        String(userId),
      ),
    );

    return response.data;
  },
};
