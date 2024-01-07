'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { TypeComponentAuthFields } from './auth-page.types';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/router';
import { getAccessToken } from '@/services/auth/auth.helper';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  Component: { isOnlyAdmin, isOnlyUser },
  children,
}) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken && user) logout();
  }, [pathname]);

  return isOnlyUser ? (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
