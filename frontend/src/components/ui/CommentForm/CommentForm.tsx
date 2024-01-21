import styles from './CommentForm.module.css';

const CommentForm = () => {
  return (
    <div className={styles.addCommentsBlock}>
      <textarea
        className={styles.commentInput}
        placeholder='Введите ваш комментарий...'
      ></textarea>
      <button className={styles.commentButton}>Отправить</button>
    </div>
  );
};

export default CommentForm;
