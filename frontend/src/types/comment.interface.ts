export interface IComment {
  commentId: number;
  userId: number;
  postId: number;
  commentText: string;
  created_at: string;
  User: { nickname: string };
}
