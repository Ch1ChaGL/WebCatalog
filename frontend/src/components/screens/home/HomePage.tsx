import PostCard from '@/components/ui/PostCard/PostCard';
import { IPost } from '@/types/post.interface';
import { FC } from 'react';
import styles from './HomePage.module.css';

const HomePage: FC<IHomePageData> = ({ posts }) => {
  return (
    <>
      <div>
        <div className={styles.posts}>
          {posts.map(post => (
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
