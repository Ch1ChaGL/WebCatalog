import { IUser } from './user.interface';

export interface IPost {
  postId: number;
  postName: string;
  banned: boolean;
  banReason: string | null;
  description: string;
  link: string;
  postImage: IPostImage[];
  categories: { categoryId: number; categoryName: string }[];
  user: IUser;
  rating: number;
}

export interface IPostImage {
  postImageId: number;
  postId: number;
  filePath: string;
  order: number;
}
