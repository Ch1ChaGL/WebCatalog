export interface IPostCreate {
  images: File[];
  postName: string;
  banned: boolean;
  description: string;
  link: string;
  categoryIds: number[] | { categoryId: string }[];
  userId: string;
}

export interface PostUpdate {
  postName: string;
  description: string;
  link: string;
  categoryIds: number[] | { categoryId: string }[];
  imagesDelete: boolean;
}
