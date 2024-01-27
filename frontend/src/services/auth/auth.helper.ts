import { IAuthResponse, IToken } from '@/store/user/user.interface';
import Cookies from 'js-cookie';

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokenStorage = (data: IToken) => {
  Cookies.set('accessToken', data.accessToken);
};

export const removeFromStorage = () => {
  Cookies.remove('accessToken');
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokenStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
  console.log('я тут был');
};
