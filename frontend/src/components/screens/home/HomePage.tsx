import { PostService } from '@/services/post/post.service';
import { IPost } from '@/types/post.interface';
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';

const HomePage: FC<IHomePageData> = ({ posts }) => {
  console.log(posts);
  return <div>Home ajdhakshdkjashdkjahdkjahdkjhaskdhakhdkajhdkahdkjha</div>;
};

export interface IHomePageData {
  posts: IPost[];
}



export default HomePage;
