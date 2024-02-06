'use client';
import React, { useEffect } from 'react';
import styles from './RedactPostPage.module.css';
import { usePost, useUpdatePost } from '@/hooks/post/usePost';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { redirect } from 'next/navigation';
import Loader from '@/components/ui/Loader/Loader';
import { IPostCreate, PostUpdate } from '@/services/post/post.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import Field from '@/components/ui/input/Field';
import { Button } from '@mui/material';
import { useCategory } from '@/hooks/category/useCategory';

const RedactPostPage = ({ postId }: { postId: string }) => {
  const { data, isFetching } = usePost(postId);
  const { user } = useTypedSelector(state => state.user);
  const { data: category } = useCategory();
  const mutation = useUpdatePost(String(data.postId));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PostUpdate>({
    mode: 'onChange',
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log('useeffect data', data);
  //     setValue('postName', data.postName);
  //     setValue('description', data.description);
  //     setValue('link', data.link);

  //     const selectedCategories = data.categories?.reduce((acc, category) => {
  //       //@ts-ignore
  //       acc[`categoryIds.${category.categoryId}`] = true;
  //       return acc;
  //     }, {});
  //     //@ts-ignore
  //     setValue('categoryIds', selectedCategories);
  //   }
  // }, [data, setValue]);

  // console.log(data);

  const onSubmit: SubmitHandler<PostUpdate> = data => {
    console.log('data', data);
    const selectedCategories = Object.entries(data.categoryIds)
      .filter(([_, isSelected]) => isSelected)
      .map(([categoryId]) => ({ categoryId }));

    console.log(selectedCategories);

    const categoryIds = [];
    for (const category of selectedCategories) {
      categoryIds.push(Number(category.categoryId));
    }

    data.categoryIds = categoryIds;

    console.log(data);

    // mutation.mutate(data);
  };

  if (isFetching) return <Loader />;
  if (data.user.userId !== user?.userId) redirect('/404');

  return (
    <>
      <div className={styles.title}>Редактирование поста - {data.postName}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          text='Название поста'
          {...register('postName', {
            required: 'Название не может быть пустым',
            value: data.postName,
            minLength: {
              value: 10,
              message: 'Длина названия должна быть больше 10 символов',
            },
          })}
          error={errors.postName?.message}
        />
        <div>Описание</div>
        <textarea
          {...register('description', {
            required: 'Описание не может быть пустым',
            value: data.description,
            minLength: {
              value: 10,
              message: 'Длина описания должна быть больше 10 символов',
            },
          })}
          style={{ minWidth: '100%' }}
          className={styles.description}
          placeholder='Введите описание...'
        ></textarea>
        {errors.description?.message}
        <Field
          text='Ссылка'
          {...register('link', {
            required: 'Ссылка не может быть пустым',
            value: data.link,
            minLength: {
              value: 5,
              message: 'Длина Ссылки должна быть больше 5 символов',
            },
          })}
        />
        <div className={styles.categoryContainer}>
          <label>Выберите категории:</label>
          <div className={styles.categoryList}>
            {category.map(category => (
              <div key={category.categoryId}>
                <input
                  type='checkbox'
                  id={`categoryIds.${category.categoryId}`}
                  {...(register(`categoryIds.${category.categoryId}`),
                  {
                    defaultChecked: data.categories
                      .map(category => category.categoryId)
                      .includes(category.categoryId),
                  })}
                />
                <label htmlFor={`categoryIds.${category.categoryId}`}>
                  {category.categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button variant='outlined' color='secondary' type='submit'>
          Сохранить
        </Button>
      </form>
    </>
  );
};

export default RedactPostPage;
