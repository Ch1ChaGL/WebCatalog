'use client';

import withAuth from '@/wrapp';

interface IAuth {
  type?: 'login' | 'register';
}

function Auth({ type }: IAuth) {
  console.log('я сгенерировалась ');

  return <div title='Auth'>Auth</div>;
}

// export const getServerSideProps = withAuth(async () => ({
//   props: {},
// }));

export default withAuth(Auth);
