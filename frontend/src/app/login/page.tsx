import Auth from '@/components/screens/auth/Auth';
import { Metadata } from 'next';

export const methadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return (
    <div>
      <Auth type='login' />
    </div>
  );
};

export default LoginPage;
