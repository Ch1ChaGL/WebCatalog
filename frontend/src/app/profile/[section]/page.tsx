'use client';
import MainProfilePage from '@/components/screens/profile/MainProfile/MainProfilePage';
import Error from 'next/error';

const SectionProfilePage = ({ params }: { params: { section: string } }) => {
  let ContentComponent;

  switch (params.section) {
    case 'addPost':
      ContentComponent = <MainProfilePage />;
      break;
    case 'settings':
      ContentComponent = <MainProfilePage />;
      break;
    default:
      ContentComponent = <Error statusCode={404} />;
  }

  return ContentComponent;
};

export default SectionProfilePage;
