import React, { FC } from 'react';
import styles from './PostRating.module.css';

interface IRatingProps {
  rating: number;
}

const getRatingColorClass = (rating: number): string => {
  if (rating >= 4) return styles.greenRating;
  if (rating >= 3) return styles.yellowRating;

  return styles.redRating;
};

const PostRating: FC<IRatingProps> = ({ rating }) => {
  return (
    <div className={`${styles['rating-box']} ${getRatingColorClass(rating)}`}>
      <div className={styles.rating__star}>
        <img src='/icon/star.svg' />
      </div>
      <div className={styles.rating}>{rating.toFixed(1)}</div>
    </div>
  );
};

export default PostRating;
