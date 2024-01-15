import React from 'react';
import styles from './Navbar.module.css';
import Button from '../button/Button';
const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.logo}>
        <span className={styles.logo__title}>Web</span>Catalog
      </div>
      <div className={styles.buttons}>
        {/* Кнопки справа */}
        <Button src='/icon/catalogIcon.svg'>Каталог</Button>
        <Button src='/icon/faworites.png'>Избранное</Button>
        <Button src='/icon/login.png'>Вход</Button>
        {/* Можно добавить больше кнопок */}
      </div>
    </div>
  );
};

export default Navbar;
