import {
  ICategoryCreate,
  ICategoryResponse,
} from '../../store/category/category.interface';
import { instance } from '@/app/api/api.interceptors';
import { HttpMethods, createRequestConfig } from '../service.config';
import { CategoryEndPoint } from './category.config';

export const CategoryService = {
  async create(data: ICategoryCreate): Promise<ICategoryResponse> {
    const response = await instance<ICategoryResponse>(
      createRequestConfig(HttpMethods.POST, CategoryEndPoint.CREATE, data),
    );

    return response.data;
  },
};
