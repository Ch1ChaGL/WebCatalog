import { MinLength } from 'class-validator';

export class CommentDto {
  userId: number;
  postId: number;
  @MinLength(10, { message: 'Введите больше текста' })
  commentText: string;
}
