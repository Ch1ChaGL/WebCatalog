'use client';

interface IAuth {
  type?: 'login' | 'register';
}

export default function Auth({ type }: IAuth) {
  return <div title='Auth'>Auth</div>;
}
