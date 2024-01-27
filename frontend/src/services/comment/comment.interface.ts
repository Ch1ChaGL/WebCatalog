export interface ICommentCreateRequest {
  userId: number | string | undefined;
  postId: number | string | undefined;
  commentText: string;
}
