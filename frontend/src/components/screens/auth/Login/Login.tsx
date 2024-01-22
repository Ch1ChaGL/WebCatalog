'use client';
import Field from '@/components/ui/input/Field';
import styles from './Login.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginData } from '@/store/user/user.interface';
import { useActions } from '@/hooks/useActions';
import { validateEmail } from '../email-validate';

export const LoginForm = () => {
  const { login } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData> = data => {
    login(data);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.authForm__container}>
        <div className={styles.authForm}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              text={'Email'}
              placeholder='Введите почту'
              {...register('email', {
                required: 'Email обязательное поле',
                pattern: {
                  value: validateEmail,
                  message: 'Введите валидный пароль',
                },
              })}
              error={errors.email?.message}
            />
            <Field
              text={'Пароль'}
              placeholder='Введите пароль'
              {...register('password', {
                required: 'Пароль обязательное поле',
                minLength: {
                  value: 5,
                  message: 'Пароль должен содержать минимум 5 символов',
                },
              })}
              type='password'
              error={errors.password?.message}
            />
            <button className={styles.authButton}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
