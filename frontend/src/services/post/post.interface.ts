export interface IPostCreate {
  images: File[];
  PostName: string;
  banned: boolean;
  description: string;
  link: string;
  categoryIds: number[];
  userId: string;
}

export interface PostUpdate {
  postName?: string;
  description?: string;
  link?: string;
  categoryIds?: number[];
  imagesDelete?: boolean;
}
