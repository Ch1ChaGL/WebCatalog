import { UserWithoutPassword } from 'src/users/users.service';

export class PostCreateDto {
  postName: string;
  banned: boolean;
  banReason?: string;
  description: string;
  link: string;
  categoryIds: number[];
  userId: number; // TODO: Заменить на currentUser когда будет сделана авторизация
}

export class CreatedPost {
  postName: string;
  banned: boolean;
  banReason?: string;
  description: string;
  link: string;
  categories?: {
    categoryId: number;
    categoryName: string;
  }[];
  user: UserWithoutPassword;
  rating: number;
}
