import { useActions } from '@/hooks/useActions';
import styles from './Registration.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegisterData } from '@/store/user/user.interface';
import Field from '@/components/ui/input/Field';
import { validateEmail } from '../email-validate';
import { useRouter } from 'next/navigation';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useState } from 'react';
import CustomAlert from '@/components/ui/customAlert/CustomAlert';

export const Registration = () => {
  const { register, clearError } = useActions();
  const router = useRouter();

  const data = useTypedSelector(state => state.user);

  const [errorPopup, setErrorPopup] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const {
    register: UserRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IRegisterData> = data => {
    register({ ...data, roles: ['user'] });
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
          <h2>Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              text={'Nickname'}
              placeholder='Введите nickname'
              {...UserRegister('nickname', {
                required: 'nickname обязательное поле',
                minLength: {
                  value: 5,
                  message: 'nickname должен содержать минимум 5 символов',
                },
              })}
              error={errors.nickname?.message}
            />
            <Field
              text={'Email'}
              placeholder='Введите почту'
              {...UserRegister('email', {
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
              {...UserRegister('password', {
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
              Уже есть аккаунт? Пора{' '}
              <span
                className={styles.link}
                onClick={() => router.push('/login')}
              >
                войти
              </span>
            </div>
            <button className={styles.authButton}>Зарегестрироваться</button>
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

export default Registration;
