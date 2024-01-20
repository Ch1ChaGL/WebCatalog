import { PostService } from '@/services/post/post.service';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const usePosts = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get posts'],
    initialData: [],
    queryFn: PostService.getPosts,
  });

  return { data, isFetching, isError, isSuccess };
};
