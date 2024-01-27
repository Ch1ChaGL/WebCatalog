import styles from './CommentForm.module.css';

const CommentForm = ({ enabled }: { enabled: boolean }) => {
  return (
    <div
      className={`${styles.addCommentsBlock} ${enabled ? '' : styles.disabled}`}
    >
      <textarea
        className={styles.commentInput}
        placeholder='Введите ваш комментарий...'
      ></textarea>
      <button className={styles.commentButton}>Отправить</button>
    </div>
  );
};

export default CommentForm;
