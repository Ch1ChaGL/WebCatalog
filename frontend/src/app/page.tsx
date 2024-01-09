'use client';
import Image from 'next/image';
import styles from './page.module.css';
import withAuth from '@/wrapp';
import HomePage from '@/components/screens/home/HomePage';

function Home() {
  return <HomePage />;
}

export default Home;
