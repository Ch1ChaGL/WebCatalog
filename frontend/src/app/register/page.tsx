import Auth from '@/components/screens/auth/Auth';
import { Metadata } from 'next';

export const methadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return <Auth type='register' />;
}
