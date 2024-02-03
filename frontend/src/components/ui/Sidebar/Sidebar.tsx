import Button from '../button/Button';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebar__header}>Меню</div>
        <ul className={styles.sidebar__list}>
          <li>
            <Button src='/icon/catalogIcon.svg' href={'/profile'}>
              Мои посты
            </Button>
          </li>
          <li>
            <Button src='/icon/faworites.png' href={'/profile/favorites'}>
              Избранное
            </Button>
          </li>
          <li>
            <Button src='/icon/setings.png' href={'/profile/settings'}>
              Настройки
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
