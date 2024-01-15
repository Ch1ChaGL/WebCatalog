import React, { FC } from 'react';
import Navbar from '../navbar/Navbar';
import styles from './Header.module.css'
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  // Дополнительные пропсы, если необходимо
}

const HeaderComponent: FC<HeaderProps> = popps => {
  return (
    <header {...popps} className={styles.header}>
      <div className='container'>
        <Navbar />
      </div>
    </header>
  );
};

export default HeaderComponent;
