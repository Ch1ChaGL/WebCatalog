'use client';
import Field from '@/components/ui/input/Field';
import Section from '../section/Section';
import styles from './UserInformationSection.module.css';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import Loader from '@/components/ui/Loader/Loader';

interface IUserInformationData {
  firstName: string;
  lastName: string;
  nickname: string;
}

const UserInformationSection = () => {
  const { user, isLoading } = useTypedSelector(state => state.user);
  const { updateUserInformation } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserInformationData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserInformationData> = data => {
    updateUserInformation({ ...data, userId: Number(user?.userId) });
    reset();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Section title={'Информация о пользователе'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            text='Имя'
            {...register('firstName', {
              value: user?.firstName as string,
            })}
          />
          <Field
            text='Фамилия'
            {...register('lastName', {
              value: user?.lastName as string,
            })}
          />
          <Field
            text='Никнейм'
            {...register('nickname', {
              value: user?.nickname,
              minLength: {
                value: 5,
                message: 'Длинна никнейма должна быть >= 5',
              },
              required: 'nickname обязательное поле',
              maxLength: {
                value: 30,
                message: 'Длинна никнейма должна быть <= 30',
              },
            })}
            error={errors.nickname?.message}
          />
          <div className={styles.btns}>
            <Button color='secondary' variant='outlined' type='submit'>
              Сохранить
            </Button>
            <Button color='error' variant='outlined' onClick={() => reset()}>
              Сбросить
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default UserInformationSection;
