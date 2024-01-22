import { FC, forwardRef } from 'react';
import { IField } from './field.interface';
import styles from './Field.module.css';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, className, type = 'text', text, ...rest }, ref) => {
    return (
      <div className={styles.input__container}>
        <label className={styles.label}>
          <div className={styles.title}>{text}</div>
          <input
            type={type}
            ref={ref}
            className={styles.input}
            placeholder={placeholder}
            {...rest}
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default Field;
