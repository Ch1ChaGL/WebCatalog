import Field from '@/components/ui/input/Field';
import Section from '../section/Section';
import styles from './UserLoginInformation.module.css';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import Loader from '@/components/ui/Loader/Loader';

interface IUserEmail {
  email: string;
}
interface IUserUpdatePassword {
  password: string;
  replayPassword: string;
}

const UserLoginInformation = () => {
  const { user, isLoading } = useTypedSelector(state => state.user);
  const { updateUserInformation } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserEmail>({
    mode: 'onChange',
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
    watch,
  } = useForm<IUserUpdatePassword>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserEmail> = data => {
    updateUserInformation({ ...data, userId: Number(user?.userId) });
    reset();
  };

  const password = watch('password', ''); // Получаем значение поля password
  const replayPassword = watch('replayPassword', '');

  const onSubmitPassword: SubmitHandler<IUserUpdatePassword> = data => {
    const { password } = data;
    updateUserInformation({ password, userId: Number(user?.userId) });
    resetPassword();
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Section title='Email - Пароль'>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.firstForm}>
          <Field
            text='Email'
            {...register('email', {
              value: user?.email as string,
            })}
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

        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <Field
            text='Новый пароль'
            {...registerPassword('password', {
              minLength: {
                value: 5,
                message: 'Пароль доллжен быть больше 5 символов',
              },
            })}
            required
            error={errorsPassword.password?.message}
            type='password'
          />
          <Field
            text='Повторить пароль'
            {...registerPassword('replayPassword', {
              validate: value => value === password || 'Пароли не совпадают',
              required: 'Обязательное поле',
            })}
            error={errorsPassword.replayPassword?.message}
            type='password'
          />
          <div className={styles.btns}>
            <Button color='secondary' variant='outlined' type='submit'>
              Сохранить
            </Button>
            <Button
              type='reset'
              color='error'
              variant='outlined'
              onClick={() => resetPassword()}
            >
              Сбросить
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default UserLoginInformation;
