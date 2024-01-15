import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
}

const Button: React.FC<PropsWithChildren<IButton>> = ({
  src,
  children,
  ...rest
}) => {
  return (
    <div className={`${styles.button}`}>
      <div className={styles.button__container}>
        <div className={styles.button__icon}>
          <img src={src} alt='Icon' />
        </div>
        <div className={styles.button__text}>{children}</div>
      </div>
    </div>
  );
};

export default Button;
