import { PostService } from '@/services/post/post.service';
import { useQuery } from '@tanstack/react-query';

export const useUserPosts = (userId: number) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`get user post ${userId}`],
    initialData: [],
    queryFn: () => PostService.getPostsByUserId(userId),
  });

  return { data, isFetching, isError, isSuccess };
};
