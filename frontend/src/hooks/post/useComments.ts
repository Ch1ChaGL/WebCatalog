import { CommentService } from '@/services/comment/comment.service';
import { useQuery } from '@tanstack/react-query';

export const useComments = (postId: string) => {
  const { data, isError, isSuccess, isFetching,  } = useQuery({
    queryKey: [`get comments ${postId}`],
    initialData: [],
    queryFn: () => CommentService.getCommentByPostId(postId),
  });

  return {
    commentsData: data,
    isCommentsFetching: isFetching,
    isError,
    isSuccess,
  };
};
