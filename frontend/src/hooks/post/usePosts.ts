import { IPosts, PostService } from '@/services/post/post.service';
import { useQuery } from '@tanstack/react-query';

export const usePosts = (page: number, limit: number, query: string = '') => {
  const { data, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['get posts'],
    initialData: {} as IPosts,
    queryFn: () => PostService.getPosts(page, limit, query),
  });

  return { data, isFetching, isError, isSuccess, refetch };
};
