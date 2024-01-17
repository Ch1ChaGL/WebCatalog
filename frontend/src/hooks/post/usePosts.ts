import { PostService } from '@/services/post/post.service';
import { QueryClient, useQuery } from '@tanstack/react-query';

export const usePosts = () => {
  const { data } = useQuery({
    queryKey: ['get posts'],
    initialData: [],
    queryFn: PostService.getPosts,
  });
  console.log('data', data);

  return data;
};
