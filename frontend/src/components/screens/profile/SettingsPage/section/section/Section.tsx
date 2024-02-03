import React, { FC } from 'react';
import styles from './Section.module.css';

interface ISectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<ISectionProps> = ({ children, title }) => {
  return (
    <div className={styles.section__container}>
      <div className={styles.section__title}>{title}</div>
      <div className={styles.section__content}>{children}</div>
    </div>
  );
};

export default Section;
