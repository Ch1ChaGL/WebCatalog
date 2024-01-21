import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { useRouter } from 'next/navigation';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  href: string;
}

const Button: React.FC<PropsWithChildren<IButton>> = ({
  src,
  children,
  href,
  ...rest
}) => {
  const { push } = useRouter();

  return (
    <div className={`${styles.button}`} onClick={() => push(href)}>
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
