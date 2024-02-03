import withAuth from '@/wrapp';
import styles from './SettingsPage.module.css';
import Section from './section/section/Section';
import UserInformationSection from './section/user-information/UserInformationSection';
import UserLoginInformation from './section/user-login/UserLoginInformation';
import UserSocialNetworksInformation from './section/user-socialNetworks/UserSocialNetworksInformation';

const SettingsPage = () => {
  return (
    <>
      <div className={styles.title}>Настройки</div>
      <UserInformationSection />
      <UserLoginInformation />
      <UserSocialNetworksInformation />
    </>
  );
};

export default withAuth(SettingsPage);
