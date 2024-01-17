import React from 'react';
import styles from './Footer.module.css';
const FooterComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer__row}>
          <div className={styles.icons}>
            icons by <a href='https://icons8.ru'>icon8</a>
          </div>
          <div className={styles.myProfile}>
            Create By <a href='https://github.com/Ch1ChaGL'>Ch1ChaGL</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
