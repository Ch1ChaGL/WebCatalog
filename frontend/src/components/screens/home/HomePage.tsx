'use client';
import PostCard from '@/components/ui/PostCard/PostCard';
import { IPost } from '@/types/post.interface';
import { FC } from 'react';
import styles from './HomePage.module.css';
import { usePosts } from '@/hooks/post/usePosts';
import Loader from '@/components/ui/Loader/Loader';
import { useAuth } from '@/hooks/useAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const HomePage: FC = () => {
  const data = useTypedSelector(state => state.user);
  const posts = usePosts();
  if (posts.isFetching) return <Loader />;
  if (posts.isError) return <div>Произошла ошибка</div>;

  console.log(data.user);
  return (
    <>
      <div>
        <div className={styles.posts}>
          {posts.data.map(post => (
            <PostCard {...post} key={post.postId} />
          ))}
        </div>
      </div>
    </>
  );
};

export interface IHomePageData {
  posts: IPost[];
}

export default HomePage;
