import withAuth from '@/wrapp';

function HomePage() {
  return <div title='Auth'>Home</div>;
}

export default withAuth(HomePage);
