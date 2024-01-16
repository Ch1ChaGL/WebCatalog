import HomePage, { IHomePageData } from '@/components/screens/home/HomePage';
import './globals.css';
import { PostService } from '@/services/post/post.service';
import { GetServerSideProps, NextPage } from 'next';
import { IPost } from '@/types/post.interface';

const Home: NextPage<IHomePageData> = ({ posts }) => {
  return <HomePage posts={posts} />;
};

const fetchData = async () => {
  const data = await PostService.getPosts();
  console.log(data);
  return data;
};

export const getServerSideProps: GetServerSideProps<IPost[]> = async () => {
  const posts = await fetchData();
  console.log('posts: ', posts);
  return {
    props: posts,
  };
};

export default Home;
