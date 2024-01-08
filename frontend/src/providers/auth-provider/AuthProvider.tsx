// import { FC, PropsWithChildren, useEffect } from 'react';
// import { TypeComponentAuthFields } from './auth-page.types';
// import dynamic from 'next/dynamic';
// import { useAuth } from '@/hooks/useAuth';
// import { useActions } from '@/hooks/useActions';
// import { useRouter, usePathname } from 'next/navigation';
// import { getAccessToken } from '@/services/auth/auth.helper';

// const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

// const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
//   Component: { isOnlyAdmin, isOnlyUser },
//   children,
// }) => {
//   const { user } = useAuth();
//   const { checkAuth, logout } = useActions();

//   const pathname = usePathname();

//   useEffect(() => {
//     const accessToken = getAccessToken();
//     if (accessToken) checkAuth();
//   }, []);

//   useEffect(() => {
//     const accessToken = getAccessToken();
//     if (!accessToken && user) logout();
//   }, [pathname]);

//   return isOnlyUser ? (
//     <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
//       {children}
//     </DynamicCheckRole>
//   ) : (
//     <>{children}</>
//   );
// };

// export default AuthProvider;

// AuthProvider.tsx
import { FC, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/services/auth/auth.helper';
import { useActions } from '@/hooks/useActions';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (!user) {
        console.log('пользователя нет');
        await router.replace('/register');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkUserAuthentication().then(() => {
      if (isAuthenticated === null) {
        setIsAuthenticated(true);
      }
    });
  }, [user, router, isAuthenticated]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken && user) logout();
  }, []);

  return !isAuthenticated ? <>{children}</> : null;
};

export default AuthProvider;
