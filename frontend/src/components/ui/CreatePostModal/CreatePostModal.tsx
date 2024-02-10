import React, { useState } from 'react';
import styles from './CreatePostModal.module.css'; // Подключите файл стилей для вашего компонента
import { Button, Modal } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPostCreate } from '@/services/post/post.interface';
import Field from '../input/Field';
import { useCategory } from '@/hooks/category/useCategory';
import { useCreatePost } from '@/hooks/post/usePost';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface CreatePostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IPostCreate>({
    mode: 'onChange',
  });
  const { user } = useTypedSelector(state => state.user);
  const { data } = useCategory();
  const mutation = useCreatePost(user?.userId as number);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обработка выбора нескольких файлов
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      // Прокидываем выбранные файлы в react-hook-form
      setValue('images', Array.from(selectedFiles));
    }
  };

  const onSubmit: SubmitHandler<IPostCreate> = data => {
    data.userId = String(user?.userId);
    data.banned = false;

    const selectedCategories = Object.entries(data.categoryIds)
      .filter(([_, isSelected]) => isSelected)
      .map(([categoryId]) => ({ categoryId }));

    const categoryIds = [];
    for (const category of selectedCategories) {
      categoryIds.push(Number(category.categoryId));
    }

    data.categoryIds = categoryIds;

    console.log(data);

    mutation.mutate(data);
    onRequestClose();
  };

  return (
    <Modal open={isOpen} onClose={onRequestClose} className={styles.modal}>
      <div className={styles.modal__container}>
        <div className={styles.title}>Создание поста</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            text='Название поста'
            {...register('postName', {
              required: 'Название не может быть пустым',
              minLength: {
                value: 10,
                message: 'Длина названия должна быть больше 10 символов',
              },
            })}
            error={errors.postName?.message}
          />
          <label>Описание</label>
          <textarea
            {...register('description', {
              required: 'Описание не может быть пустым',
              minLength: {
                value: 10,
                message: 'Длина описания должна быть больше 10 символов',
              },
            })}
            className={styles.description}
            placeholder='Введите описание...'
          ></textarea>
          {errors.description?.message}
          <Field
            text='Ссылка'
            {...register('link', {
              required: 'Ссылка не может быть пустым',
              minLength: {
                value: 5,
                message: 'Длина Ссылки должна быть больше 5 символов',
              },
            })}
          />
          <label>Выберите файлы: </label>
          <input
            type='file'
            accept='image/*' // Фильтр для выбора только изображений
            multiple // Разрешение загрузки нескольких файлов
            onChange={handleFileChange}
          />
          <div className={styles.categoryContainer}>
            <label>Выберите категории:</label>
            <div className={styles.categoryList}>
              {data.map(category => (
                <div key={category.categoryId}>
                  <input
                    type='checkbox'
                    id={`categoryIds.${category.categoryId}`}
                    {...register(`categoryIds.${category.categoryId}`)}
                  />
                  <label htmlFor={`categoryIds.${category.categoryId}`}>
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button variant='outlined' color='secondary' type='submit'>
            Создать
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
