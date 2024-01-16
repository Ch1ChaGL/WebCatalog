import { PostService } from '@/services/post/post.service';
import { IPost } from '@/types/post.interface';
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';

const HomePage: FC<IHomePageData> = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <div>{post.postName} {post.description}</div>
      ))}
    </>
  );
};

export interface IHomePageData {
  posts: IPost[];
}

export default HomePage;
