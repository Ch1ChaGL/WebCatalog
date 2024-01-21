'use client';
import { FC } from 'react';
import styles from './PostPage.module.css';
import { usePost } from '@/hooks/post/usePost';
import Slider from 'react-slick';
import Loader from '@/components/ui/Loader/Loader';
import { usePostImage } from '@/hooks/usePostImage';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface PostPageProps {
  postId: string;
}

const PostPage: FC<PostPageProps> = ({ postId }) => {
  const { data, isFetching, isError, isSuccess } = usePost(postId);

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
        <div className={styles.header__leftColumn}></div>

        <div className={styles.header__rigthColumn}>
          <div className={styles.header__title}>{data.postName}</div>
          <div className={styles.header__description}>{data.description}</div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
