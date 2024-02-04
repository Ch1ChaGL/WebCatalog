import { IPostCreate } from '@/services/post/post.interface';
import { PostService } from '@/services/post/post.service';
import { IPost } from '@/types/post.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePost = (postId: string) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`get post ${postId}`],
    initialData: {} as IPost,
    queryFn: () => PostService.getPost(postId),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useCreatePost = (userId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostCreate) => PostService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get user post ${userId}`],
      });
    },
  });

  return mutation;
};
