import { CommentService } from '@/services/comment/comment.service';
import { ICommentCreateRequest } from './../../services/comment/comment.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ICommentCreateRequest) => CommentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get comments ${postId}`],
      });
    },
  });

  return mutation;
};
