import React, { useState } from 'react';
import styles from './CreatePostModal.module.css'; // Подключите файл стилей для вашего компонента
import { Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IPostCreate } from '@/services/post/post.interface';
import Field from '../input/Field';

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
  } = useForm<IPostCreate>({
    mode: 'onChange',
  });

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <div className={styles.modal__container}>
        <div className={styles.title}>Создание поста</div>
        <form>
          <Field
            text='Название поста'
            {...register('PostName', {
              required: 'Название не может быть пустым',
              minLength: {
                value: 10,
                message: 'Длина названия должна быть больше 10 символов',
              },
            })}
            error={errors.PostName?.message}
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
        </form>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
