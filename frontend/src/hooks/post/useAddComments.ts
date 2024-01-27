import { CommentService } from '@/services/comment/comment.service';
import { ICommentCreateRequest } from './../../services/comment/comment.interface';
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { IComment } from '@/types/comment.interface';

export const useAddComment = (postId: string) => {
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (data: ICommentCreateRequest) => CommentService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`get comments ${postId}`],
      }),
  });

  return mutation;
};
