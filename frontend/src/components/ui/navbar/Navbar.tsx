import React from 'react';
import styles from './Navbar.module.css';
import Button from '../button/Button';
import Link from 'next/link';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { redirect, useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useTypedSelector(state => state.user);
  console.log(user);
  const router = useRouter();
  const { logout, checkAuth } = useActions();

  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.logo}>
        <Link href={'/'} className={styles.link}>
          <span className={styles.logo__title}>Web</span>Catalog
        </Link>
      </div>
      <div className={styles.buttons}>
        {/* Кнопки справа */}
        <Button src='/icon/catalogIcon.svg' href={'/'}>
          Каталог
        </Button>
        <Button src='/icon/faworites.png' href={'/favorites'}>
          Избранное
        </Button>
        {user == null ? (
          <Button src='/icon/login.png' href={'/login'}>
            Вход
          </Button>
        ) : (
          <Button
            src='/icon/выход.svg'
            click={() => {
              logout();
            }}
          >
            Выход
          </Button>
        )}
        {/* Можно добавить больше кнопок */}
      </div>
    </div>
  );
};

export default Navbar;
