import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
//@ts-ignore
const withAuth = (WrappedComponent, allowedRoles: string[] = []) => {
  //@ts-ignore
  const Wrapper = props => {
    const router = useRouter();
    const { user } = useTypedSelector(state => state.user);

    useEffect(() => {
      // Если пользователь не аутентифицирован, перенаправьте на страницу входа
      if (!user) {
        router.replace('/login');
      }

      // Если пользователь не имеет правильной роли, не рендерить обернутый компонент
      if (
        allowedRoles.length > 0 &&
        (!user?.roles || !user.roles.some(role => allowedRoles.includes(role)))
      ) {
        router.replace('/unauthorized'); // замените '/unauthorized' на ваш путь ошибки доступа
      }
    }, [user, allowedRoles, router]);

    if (
      !user ||
      (allowedRoles.length > 0 &&
        !user.roles?.some(role => allowedRoles.includes(role)))
    ) {
      // Не рендерить обернутый компонент
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
