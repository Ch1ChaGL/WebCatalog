'use client';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { ILoginData, IRegisterData } from '@/store/user/user.interface';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function Auth() {
  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [type, setType] = useState<'login' | 'register'>('login');

  const {
    register: formRegister,
    handleSubmit,
    formState,
    reset,
  } = useForm<ILoginData | IRegisterData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData | IRegisterData> = data => {
    if (type === 'login') {
      login(data);
    } else {
      register(data as IRegisterData);
    }

    reset();
  };

  return (
    <div title='Auth'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit'>Go</button>
      </form>
    </div>
  );
}

export default Auth;
