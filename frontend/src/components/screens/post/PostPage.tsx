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

interface PostPageProps {
  postId: string;
}

const PostPage: FC<PostPageProps> = ({ postId }) => {
  const { data, isFetching, isError, isSuccess } = usePost(postId);
  const { commentsData, isCommentsFetching } = useComments(postId);
  if (isFetching) return <Loader />;
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
          <div className={styles.header__title}>{data.postName}</div>
          <PostRating rating={data.rating} />
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
        <div className={styles.createrBlock__title}>Комментарии:</div>
        {isCommentsFetching ? (
          <Loader />
        ) : (
          <div>
            {commentsData.length !== 0 ? (
              commentsData.map(comment => (
                <p>
                  <span className={styles.nickname}>
                    {comment.User.nickname}
                  </span>
                  : {comment.commentText} {useMoscowDate(comment.created_at)}
                </p>
              ))
            ) : (
              <p>У поста пока нет комментариев, самое время его оставить</p>
            )}
          </div>
        )}

        <CommentForm />
      </div>
    </>
  );
};

export default PostPage;
