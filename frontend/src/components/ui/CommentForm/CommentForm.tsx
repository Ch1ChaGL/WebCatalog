import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './CommentForm.module.css';
import { ICommentCreateRequest } from '@/services/comment/comment.interface';
import { useAddComment } from '@/hooks/post/useAddComments';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuth } from '@/hooks/useAuth';

const CommentForm = ({
  enabled,
  postId,
}: {
  enabled: boolean;
  postId: string;
}) => {
  const userData = useTypedSelector(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<ICommentCreateRequest, 'commentText'>>({
    mode: 'onChange',
  });

  console.log(postId);

  const addComment = useAddComment(postId);

  const onSubmit: SubmitHandler<
    Pick<ICommentCreateRequest, 'commentText'>
  > = async data => {
    const comment = {
      commentText: data.commentText,
      postId: postId,
      userId: userData.user?.userId,
    };

    addComment.mutate(comment);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.addCommentsBlock} ${enabled ? '' : styles.disabled}`}
    >
      <textarea
        {...register('commentText', {
          required: 'Комментарий не может быть пустым',
          minLength: {
            value: 10,
            message: 'Длина комментария должна быть больше 10 символов',
          },
        })}
        className={styles.commentInput}
        placeholder='Введите ваш комментарий...'
      ></textarea>
      {errors.commentText && (
        <div className={styles.error}>{errors.commentText.message}</div>
      )}
      <button className={styles.commentButton}>Комментировать</button>
    </form>
  );
};

export default CommentForm;
