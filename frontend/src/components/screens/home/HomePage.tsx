'use client';
import PostCard from '@/components/ui/PostCard/PostCard';
import { IPost } from '@/types/post.interface';
import { FC } from 'react';
import styles from './HomePage.module.css';
import { usePosts } from '@/hooks/post/usePosts';
import Loader from '@/components/ui/Loader/Loader';
import { useAuth } from '@/hooks/useAuth';

const HomePage: FC = () => {
  const posts = usePosts();
  if (posts.isFetching) return <Loader />;
  if (posts.isError) return <div>Произошла ошибка</div>;
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
