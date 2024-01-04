import Auth from '@/components/screens/auth/Auth';
import { Metadata } from 'next';

export const methadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return <Auth type='login' />;
}
