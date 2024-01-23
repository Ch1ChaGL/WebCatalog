'use client';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { useRouter } from 'next/navigation';
import { useActions } from '@/hooks/useActions';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  href?: string;
  click?: () => void;
}

const Button: React.FC<PropsWithChildren<IButton>> = ({
  src,
  children,
  href = '',
  click,
  ...rest
}) => {
  const { push } = useRouter();
  const { logout } = useActions();
  return (
    <div
      className={`${styles.button}`}
      onClick={
        click
          ? () => {
              click();
            }
          : () => push(href)
      }
    >
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
