'use client';
import React, { useEffect, useState } from 'react';
import styles from './RedactPostPage.module.css';
import {
  usePost,
  useUpdateImagePost,
  useUpdatePost,
} from '@/hooks/post/usePost';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { redirect, useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader/Loader';
import { PostUpdate } from '@/services/post/post.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import Field from '@/components/ui/input/Field';
import { Button } from '@mui/material';
import { useCategory } from '@/hooks/category/useCategory';
import CustomAlert from '@/components/ui/customAlert/CustomAlert';
import { PostService } from '@/services/post/post.service';

const RedactPostPage = ({ postId }: { postId: string }) => {
  const { data, isFetching } = usePost(postId);
  const { replace } = useRouter();
  const { user } = useTypedSelector(state => state.user);
  const { data: category } = useCategory();
  const mutation = useUpdatePost(String(data.postId));
  const mutateImage = useUpdateImagePost(String(data.postId));
  const [successPopup, setSuccessPopup] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PostUpdate>({
    mode: 'onChange',
  });

  const {
    register: imageRegister,
    handleSubmit: imageHandleSubmit,
    formState: { errors: imageErrors },
    setValue: imageSetValue,
  } = useForm<{ images: File[] }>({
    mode: 'onChange',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обработка выбора нескольких файлов
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      // Прокидываем выбранные файлы в react-hook-form
      imageSetValue('images', Array.from(selectedFiles));
    }
  };

  const onSubmit: SubmitHandler<PostUpdate> = data => {
    console.log('data', data);
    const selectedCategories = Object.entries(data.categoryIds)
      .filter(([_, isSelected]) => isSelected)
      .map(([categoryId]) => ({ categoryId }));

    const categoryIds = [];
    for (const category of selectedCategories) {
      categoryIds.push(Number(category.categoryId));
    }

    data.categoryIds = categoryIds;

    mutation.mutate(data);

    setSuccessPopup({
      title: 'Успешно обновлено',
      message: 'Обновление данных о посте прошло успешно',
    });
  };

  const onSubmitImage: SubmitHandler<{ images: File[] }> = data => {
    mutateImage.mutate(data.images);

    setSuccessPopup({
      title: 'Успешно обновлено',
      message: 'Обновление картинок поста прошло успешно',
    });
  };

  const handlePopupClose = () => {
    setSuccessPopup(null);
  };

  const deletePost = async () => {
    await PostService.deletePost(postId);
    replace('/profile');
  };

  if (isFetching) return <Loader />;
  if (data.user.userId !== user?.userId) redirect('/404');

  return (
    <>
      <div className={styles.title}>
        Редактирование данных поста - {data.postName}
      </div>
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
          error={errors.link?.message}
        />
        <div className={styles.categoryContainer}>
          <label>Выберите категории:</label>
          <div className={styles.categoryList}>
            {category.map(category => (
              <div key={category.categoryId}>
                <input
                  type='checkbox'
                  id={`categoryIds.${category.categoryId}`}
                  {...register(`categoryIds.${category.categoryId}`)}
                  defaultChecked={data.categories
                    .map(category => category.categoryId)
                    .includes(category.categoryId)}
                />
                <label htmlFor={`categoryIds.${category.categoryId}`}>
                  {category.categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btns}>
          <Button variant='outlined' color='secondary' type='submit'>
            Сохранить
          </Button>
          <Button variant='outlined' color='primary' onClick={() => reset()}>
            Сбросить
          </Button>
        </div>
      </form>

      <form
        onSubmit={imageHandleSubmit(onSubmitImage)}
        className={styles.imageForm}
      >
        <label>Выберите файлы: </label>
        <input
          type='file'
          accept='image/*' // Фильтр для выбора только изображений
          multiple // Разрешение загрузки нескольких файлов
          onChange={handleFileChange}
        />
        <Button variant='outlined' color='secondary' type='submit'>
          Сохранить
        </Button>
      </form>

      <Button
        variant='outlined'
        color='error'
        onClick={async () => await deletePost()}
      >
        Удалить пост
      </Button>

      {successPopup && (
        <CustomAlert
          open={Boolean(successPopup)}
          onClose={handlePopupClose}
          description={successPopup.message}
          title={successPopup.title}
          type='success'
        />
      )}
    </>
  );
};

export default RedactPostPage;
