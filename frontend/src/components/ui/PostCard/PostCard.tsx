import React from 'react';
import styles from './PostCard.module.css';
import PostRating from '../Rating/PostRating';
import { IPostImage } from '@/types/post.interface';
import { usePostCardImagePath } from './usePostCardImagePath';
import { upperFirstLetter } from '@/utils/upperFirstLetter';
import { hideLongText } from '@/utils/hideLongText';

interface IPostCardData {
  postId: number;
  postName: string;
  description: string;
  postImage: IPostImage[];
  categoryIds: number[];
  rating: number;
}

const PostCard: React.FC<IPostCardData> = props => {
  const imagePath = usePostCardImagePath(props.postImage);
  return (
    <div className={styles.PostCard}>
      <div className={styles.PostCard__title}>
        {upperFirstLetter(props.postName)}
      </div>
      <PostRating rating={props.rating} />
      <div className={styles.PostCard__image}>
        <img src={imagePath} />
      </div>
      <div className={styles.PostCard__categorys}>категории</div>
      <div className={styles.PostCard__description}>
        {hideLongText(upperFirstLetter(props.description), 50)}
      </div>
    </div>
  );
};

export default PostCard;
