import { RatingService } from '@/services/rating/rating.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRating = (postId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { userId: number; rate: number }) =>
      RatingService.rate({ ...data, postId: postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get post ${postId}`],
      });
    },
  });

  return mutation;
};
