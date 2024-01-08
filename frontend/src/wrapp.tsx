// withAuth.tsx
import { redirect, useRouter } from 'next/navigation';
import { useTypedSelector } from './hooks/useTypedSelector';

//@ts-ignore
const withAuth = (WrappedComponent, allowedRoles = []) => {
  //@ts-ignore
  const Wrapper = props => {
    const router = useRouter();
    const { user } = useTypedSelector(state => state.user);

    console.log(user);

    // Если пользователь не аутентифицирован, перенаправьте на страницу входа
    if (!user) {
      redirect('/'); // или редирект на страницу входа
    }

    // Если пользователь не имеет правильной роли, не рендерить обернутый компонент
    if (allowedRoles.length > 0) {
      return null; // или редирект на страницу с ошибкой доступа
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
