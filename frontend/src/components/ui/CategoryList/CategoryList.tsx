'use client';
import { IPost } from '@/types/post.interface';
import { FC, useState } from 'react';
import Slider from 'react-slick';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CategoryList: FC<Pick<IPost, 'categories'>> = ({
  categories,
}) => {
  const sliderSettings = {
    infinite: true,
    slidesToShow: categories.length >= 3 ? 3 : categories.length, // Отобразить максимум 3 категории, если есть столько
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    focusOnSelect: true,
  };

  return (
    <div className={styles.categoryList}>
      <Slider {...sliderSettings} className={styles.row}>
        {categories.map(category => (
          <CategoryItem key={category.categoryId} {...category} />
        ))}
      </Slider>
    </div>
  );
};

export default CategoryList;
