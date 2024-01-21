import { PostService } from '@/services/post/post.service';
import { IPost } from '@/types/post.interface';
import { useQuery } from '@tanstack/react-query';

export const usePost = (postId: string) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get post'],
    initialData: {} as IPost,
    queryFn: () => PostService.getPost(postId),
  });

  return { data, isFetching, isError, isSuccess };
};
