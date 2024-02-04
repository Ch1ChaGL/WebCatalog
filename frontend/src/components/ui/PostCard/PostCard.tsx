import React, { useState } from 'react';
import styles from './PostCard.module.css';
import PostRating from '../Rating/PostRating';
import { IPost, IPostImage } from '@/types/post.interface';
import { usePostCardImagePath } from './usePostCardImagePath';
import { upperFirstLetter } from '@/utils/upperFirstLetter';
import { hideLongText } from '@/utils/hideLongText';
import CategoryList from '../CategoryList/CategoryList';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const openPostPage = (postId: number, router: AppRouterInstance) => {
  router.push(`/post/${postId}`);
};
const openPostRedactPage = (postId: number, router: AppRouterInstance) => {
  router.push(`/post/redact/${postId}`);
};

interface PostCardProps extends IPost {
  type: 'public' | 'private';
}

const PostCard: React.FC<PostCardProps> = props => {
  const imagePath = usePostCardImagePath(props.postImage);
  const router = useRouter();
  return (
    <div className={styles.PostCard}>
      <div className={styles.PostCard__title}>
        {upperFirstLetter(props.postName)}
      </div>
      <PostRating rating={props.rating} />
      <div className={styles.PostCard__image}>
        <img src={imagePath} />
      </div>
      <div className={styles.PostCard__categorys}>
        <CategoryList categories={props.categories} />
      </div>
      <div className={styles.PostCard__description}>
        {hideLongText(upperFirstLetter(props.description), 50)}
      </div>

      <div className={styles['btns']}>
        <div
          className={styles.button}
          onClick={() => openPostPage(props.postId, router)}
        >
          Подробнее...
        </div>
        {props.type === 'private' && (
          <div
            className={styles.redactButton}
            onClick={() => openPostRedactPage(props.postId, router)}
          >
            Редактировать
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
