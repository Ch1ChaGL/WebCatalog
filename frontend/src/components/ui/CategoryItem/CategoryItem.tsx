import { FC } from 'react';
import styles from './CategoryItem.module.css';
import { ICategory } from '@/types/category.interface';

const CategoryItem: FC<ICategory> = ({ categoryId, categoryName }) => {
  return <div className={styles.category__box}>{categoryName}</div>;
};

export default CategoryItem;
