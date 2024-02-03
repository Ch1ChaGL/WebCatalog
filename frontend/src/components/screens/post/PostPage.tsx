'use client';
import { FC } from 'react';
import styles from './PostPage.module.css';
import { usePost } from '@/hooks/post/usePost';
import Slider from 'react-slick';
import Loader from '@/components/ui/Loader/Loader';
import { usePostImage } from '@/hooks/usePostImage';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import PostRating from '@/components/ui/Rating/PostRating';
import { useComments } from '@/hooks/post/useComments';
import { useMoscowDate } from '@/hooks/useMoscowDate';
import CommentForm from '@/components/ui/CommentForm/CommentForm';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  useIsFavorites,
  useToggleFavorites,
} from '@/hooks/favorites/useFavorites';
import { Rating } from 'react-simple-star-rating';
import { useRating } from '@/hooks/rating/useRating';

interface PostPageProps {
  postId: string;
}

const PostPage: FC<PostPageProps> = ({ postId }) => {
  const { data, isFetching, isError, isSuccess } = usePost(postId);
  const { commentsData, isCommentsFetching } = useComments(postId);
  const rating = useRating(+postId);

  const user = useTypedSelector(state => state.user);
  const { data: isFavorites, isFetching: isFavoritesFetching } = useIsFavorites(
    {
      postId: +postId,
      userId: user.user?.userId as number,
    },
  );
  const toggleFavorites = useToggleFavorites({
    postId: +postId,
    userId: user.user?.userId as number,
  });

  if (isFetching || isFavoritesFetching) return <Loader />;
  if (isError) return <div>Произошла ошибка</div>;

  const postImages = data.postImage.sort((a, b) => a.order - b.order);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1, // Отобразить максимум 3 категории, если есть столько
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    focusOnSelect: true,
  };

  const favoritesClick = () => {
    if (!user.user) return;
    toggleFavorites.mutate({
      postId: +postId,
      userId: user.user.userId as number,
    });
  };

  const rate = (rate: number, index: number, event: any) => {
    if (!user.user || event === undefined) return;
    rating.mutate({ rate: rate, userId: user.user.userId as number });
  };

  return (
    <>
      {postImages.length !== 0 ? (
        <Slider {...sliderSettings} className={styles.slider}>
          {postImages.map(image => (
            <div className={styles.slider__item} key={image.postImageId}>
              <img src={usePostImage(image.filePath)} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className={styles.noImageContainer}>
          <img src='/icon/no-image.png' />
        </div>
      )}
      <div className={styles.PostPage__header}>
        <div className={styles.header__rigthColumn}>
          <div className={styles.header}>
            <div className={styles.header__title}>{data.postName}</div>
            <div
              className={
                user.user ? styles.favorites : styles.favorites_disabled
              }
              onClick={() => favoritesClick()}
            >
              {isFavorites && user.user ? (
                <img src='/icon/favorites-black.svg' />
              ) : (
                <img src='/icon/favorites-white.svg' />
              )}
            </div>
          </div>
          <PostRating rating={data.rating} />
          <Rating
            initialValue={data.rating}
            allowFraction={true}
            onClick={rate}
            className={user.user ? '' : styles.star_disabled}
          />
          <div className={styles.header__description}>{data.description}</div>
          <div className={styles.link}>
            <a className={styles.link__title} href={data.link}>
              Перейти к ресурсу
            </a>
          </div>
        </div>
      </div>
      <div className={styles.createrBlock}>
        <div className={styles.createrBlock__title}>
          Информация о создателе поста:
        </div>
        <div className={styles.createrBlock__email}>
          UserName: {data.user.nickname}
        </div>
        <div className={styles.createrBlock__email}>
          Email: {data.user.email}
        </div>
        <div className={styles.createrBlock__categoriesTitle}>
          Найти меня в соц сетях:
        </div>
        <div className={styles.createrBlock__categoriesBox}>
          {data.user.socialNetwork.map(category => (
            <a href={category.link}>
              <img src={usePostImage(category.iconPath)} />
            </a>
          ))}
        </div>
      </div>

      <div className={styles.commentsBlock}>
        {isCommentsFetching ? (
          <Loader />
        ) : (
          <div>
            {commentsData.length !== 0 ? (
              commentsData.map(comment => (
                <div
                  key={comment.commentId}
                  className={styles.commentContainer}
                >
                  <div className={styles.commentHeader}>
                    <span className={styles.nickname}>
                      {comment.User.nickname}
                    </span>
                    <span className={styles.commentDate}>
                      {useMoscowDate(comment.created_at)}
                    </span>
                  </div>
                  <p className={styles.commentText}>{comment.commentText}</p>
                </div>
              ))
            ) : (
              <p>У поста пока нет комментариев, самое время его оставить</p>
            )}
          </div>
        )}
        <CommentForm enabled={user.user !== null} postId={postId} />
      </div>
    </>
  );
};

export default PostPage;
