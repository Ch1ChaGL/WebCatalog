import { IComment } from '@/types/comment.interface';

export interface ICommentCreateRequest extends Omit<IComment, 'commentId'> {}
