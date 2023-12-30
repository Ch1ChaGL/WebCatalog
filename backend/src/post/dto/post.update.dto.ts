export class PostUpdateDto {
  postName?: string;
  description?: string;
  link?: string;
  categoryIds?: number[];
  imagesDelete?: boolean;
}
