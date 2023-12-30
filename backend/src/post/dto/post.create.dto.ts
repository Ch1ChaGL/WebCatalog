export class PostCreateDto {
  postName: string;
  banned: boolean;
  banReason?: string;
  description: string;
  link: string;
  categoryIds: number[];
  userId: number; // TODO: Заменить на currentUser когда будет сделана авторизация
}
