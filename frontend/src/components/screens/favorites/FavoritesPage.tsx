'use client';
import Loader from '@/components/ui/Loader/Loader';
import { useFavorites } from '@/hooks/favorites/useFavorites';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import withAuth from '@/wrapp';
import React from 'react';
import styles from './FavoritesPage.module.css';
import PostCard from '@/components/ui/PostCard/PostCard';

const FavoritesPage = () => {
  const data = useTypedSelector(state => state.user);
  const favorites = useFavorites(String(data.user?.userId));

  if (favorites.isFetching) return <Loader />;
  if (favorites.isError) return <div>Произошла ошибка</div>;

  return (
    <>
      <div>
        <div className={styles.title}>Избранное</div>
        <div className={styles.posts}>
          {favorites.data.map(favorite => (
            <PostCard {...favorite} key={favorite.postId} type='public'/>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(FavoritesPage);
