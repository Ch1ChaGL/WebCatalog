'use client';
import PostCard from '@/components/ui/PostCard/PostCard';
import { IPost } from '@/types/post.interface';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css';
import { usePosts } from '@/hooks/post/usePosts';
import Loader from '@/components/ui/Loader/Loader';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Button, MenuItem, Pagination, Select } from '@mui/material';
import Field from '@/components/ui/input/Field';
import { useActions } from '@/hooks/useActions';

const HomePage: FC = () => {
  const search = useTypedSelector(state => state.search);
  const { setLimit, setPage, setQuery } = useActions();

  const [query, sq] = useState('');

  const posts = usePosts(search.page, search.limit, search.query || '');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    posts.refetch();
  }, [search.page, search.limit, search.query]);

  if (posts.isFetching) return <Loader />;
  if (posts.isError) return <div>Произошла ошибка</div>;

  return (
    <>
      <div>
        <div className={styles.search}>
          <div className={styles.searchInput}>
            <Field
              text=''
              placeholder='Введите свой запрос'
              value={query}
              onChange={e => sq(e.target.value as string)}
            />
          </div>
          <div className={styles.searchBtn}>
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => {
                setQuery(query);
                setPage(1);
              }}
            >
              Найти
            </Button>
          </div>
        </div>
        <div className={styles.select}>
          <Select
            color='secondary'
            value={search.limit}
            onChange={e => {
              setPage(1);
              setLimit(e.target.value as number);
            }}
          >
            <MenuItem value={5} selected>
              5
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </div>
        <div
          className={`${styles.posts} ${
            search.limit ? styles[`post${search.limit}`] : 5
          }`}
        >
          {posts.data.posts.map(post => (
            <PostCard {...post} key={post.postId} type='public' />
          ))}
        </div>
        <div className={styles.pagination}>
          <Pagination
            page={search.page}
            count={posts.data.totalPages}
            variant='outlined'
            shape='rounded'
            color='secondary'
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export interface IHomePageData {
  posts: IPost[];
}

export default HomePage;
