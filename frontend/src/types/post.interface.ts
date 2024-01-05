import { IUser } from './user.interface';

export interface IPost {
  postId: number;
  postName: string;
  banned: boolean;
  banReason: string | null;
  description: string;
  link: string;
  postImage: IPostImage[];
  categoryIds: number[];
  user: IUser;
  rating: number;
}

export interface IPostImage {
  postImageId: number;
  postId: number;
  filePath: string;
  order: number;
}
