import HomePage, { IHomePageData } from '@/components/screens/home/HomePage';
import './globals.css';
import { PostService } from '@/services/post/post.service';
import { GetServerSideProps, NextPage } from 'next';
import { IPost } from '@/types/post.interface';
import axios from 'axios';

const Home = async () => {
  const posts = await fetchData();
  return <HomePage posts={posts} />;
};

const fetchData = async () => {
  'use server';
  const data = await axios.get<IPost[]>('http://localhost:4200/api/post/');
  console.log(data);
  return data.data;
};

export default Home;
