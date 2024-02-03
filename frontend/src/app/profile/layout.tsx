import Sidebar from '@/components/ui/Sidebar/Sidebar';
import styles from './layout.module.css';

const ProfileLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className={styles['profile-layout']}>
      <div className={styles['sidebar']}>
          <Sidebar />
      </div>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};

export default ProfileLayout;
