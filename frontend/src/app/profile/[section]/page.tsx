'use client';
import FavoritesPage from '@/components/screens/favorites/FavoritesPage';
import MainProfilePage from '@/components/screens/profile/MainProfile/MainProfilePage';
import SettingsPage from '@/components/screens/profile/SettingsPage/SettingsPage';
import Error from 'next/error';
const SectionProfilePage = ({ params }: { params: { section: string } }) => {
  let ContentComponent;

  switch (params.section) {
    case 'addPost':
      ContentComponent = <MainProfilePage />;
      break;
    case 'settings':
      ContentComponent = <SettingsPage />;
      break;
    case 'favorites':
      ContentComponent = <FavoritesPage />;
      break;
    default:
      ContentComponent = <Error statusCode={404} />;
  }

  return (
    <>
      {ContentComponent}
    </>
  );
};

export default SectionProfilePage;
