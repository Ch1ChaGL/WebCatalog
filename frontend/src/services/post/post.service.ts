import { IPost } from './../../types/post.interface';
import { IPostCreate, PostUpdate } from './post.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { PostEndPoint } from './post.config';
export const PostService = {
  async create(data: IPostCreate): Promise<IPost> {
    const formData = new FormData();

    // Добавляем поля из IPostCreate в FormData
    formData.append('PostName', data.PostName);
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

  async getPosts(): Promise<IPost[]> {
    const response = await instance<IPost[]>(
      createRequestConfig(HttpMethods.GET, PostEndPoint.GET_ALL_POSTS),
    );

    console.log(response);
    return response.data;
  },

  async toggleBanPost(postId: string): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.PATH,
        PostEndPoint.TOGGLE_BAN,
        null,
        postId,
      ),
    );

    return response.data;
  },

  async updatePost(postId: string, data: PostUpdate): Promise<IPost> {
    const response = await instance<IPost>(
      createRequestConfig(HttpMethods.PATH, PostEndPoint.UPDATE, data, postId),
    );

    return response.data;
  },

  async deletePost(postId: string): Promise<boolean> {
    const response = await instance<boolean>(
      createRequestConfig(
        HttpMethods.DELETE,
        PostEndPoint.DELETE,
        null,
        postId,
      ),
    );
    return response.data;
  },
};
