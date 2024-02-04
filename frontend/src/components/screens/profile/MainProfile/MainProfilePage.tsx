import withAuth from '@/wrapp';
import styles from './MainProfilePage.module.css';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useUserPosts } from '@/hooks/post/useUserPosts';
import Loader from '@/components/ui/Loader/Loader';
import PostCard from '@/components/ui/PostCard/PostCard';
import { Button } from '@mui/material';
import { useState } from 'react';
import CreatePostModal from '@/components/ui/CreatePostModal/CreatePostModal';

const MainProfilePage = () => {
  const { user } = useTypedSelector(state => state.user);
  const posts = useUserPosts(user?.userId as number);
  const [isOpen, setIsOpen] = useState(false);

  if (posts.isFetching) return <Loader />;
  if (posts.isError) return <div>Произошла ошибка</div>;

  return (
    <div>
      <CreatePostModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
      <div className={styles.title}>Мои посты</div>
      <div className={styles.addButton}>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => setIsOpen(true)}
        >
          Создать пост
        </Button>
      </div>
      <div className={styles.posts}>
        {posts.data.map(post => (
          <PostCard {...post} key={post.postId} type='private' />
        ))}
      </div>
    </div>
  );
};

export default withAuth(MainProfilePage);
