import Auth from '@/components/screens/auth/AuthPage';
import { LoginForm } from '@/components/screens/auth/Login/Login';
import { Metadata } from 'next';

export const methadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
