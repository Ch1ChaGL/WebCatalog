import React from 'react';
import styles from './Navbar.module.css';
import Button from '../button/Button';
import Link from 'next/link';
const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.logo}>
        <Link href={'/'} className={styles.link}>
          <span className={styles.logo__title}>Web</span>Catalog
        </Link>
      </div>
      <div className={styles.buttons}>
        {/* Кнопки справа */}
        <Button src='/icon/catalogIcon.svg' href={'/login'}>
          Каталог
        </Button>
        <Button src='/icon/faworites.png' href={'/'}>
          Избранное
        </Button>
        <Button src='/icon/login.png' href={'/'}>
          Вход
        </Button>
        {/* Можно добавить больше кнопок */}
      </div>
    </div>
  );
};

export default Navbar;
