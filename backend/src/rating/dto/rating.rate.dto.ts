import { IsInt, Max, Min } from 'class-validator';

export class RateDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
  userId: number; //TODO поменять на currentUser когда будет готова авторизация
  postId: number;
}
