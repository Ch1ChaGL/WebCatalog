'use client';
import Field from '@/components/ui/input/Field';
import styles from './Login.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginData } from '@/store/user/user.interface';
import { useActions } from '@/hooks/useActions';
import { validateEmail } from '../email-validate';
import { useRouter } from 'next/navigation';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useState } from 'react';
import CustomAlert from '@/components/ui/customAlert/CustomAlert';

export const LoginForm = () => {
  const { login, clearError } = useActions();
  const router = useRouter();
  const data = useTypedSelector(state => state.user);

  const [errorPopup, setErrorPopup] = useState<{
    title: string;
    message: string;
  } | null>(null);

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

  if (data.user) router.replace('/');
  if (data.error !== null) {
    setErrorPopup({ title: 'Произошла ошибка', message: data.error });
    clearError();
  }
  const handlePopupClose = () => {
    setErrorPopup(null);
    // Assuming you have a clearError action in your useActions hook
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
                  message: 'Введите валидный email',
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
            <div className={styles.goAnotherAuthPage}>
              Еще нет аккаунта? Пора{' '}
              <span
                className={styles.link}
                onClick={() => router.push('/register')}
              >
                зарегестрировать
              </span>
            </div>
            <button className={styles.authButton}>Войти</button>

            {errorPopup && (
              <CustomAlert
                type='error'
                title='Ошибка'
                description={errorPopup.message}
                open={Boolean(errorPopup)}
                onClose={handlePopupClose}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
