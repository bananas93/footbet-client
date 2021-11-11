import { useLocation, Link } from 'react-router-dom';
import {
  HomeOutlined, TrophyOutlined, BarsOutlined, MessageOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';

export default function BottomTabs() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={styles.tabs}>
      <ul className={styles.tabsWrap}>
        <li className={`${styles.tabsItem} ${pathname === '/' ? styles.tabsItemActive : ''}`}>
          <Link className={styles.tabsLink} to="/">
            <HomeOutlined />
            <span className={styles.tabsTitle}>Головна</span>
          </Link>
        </li>
        <li className={`${styles.tabsItem} ${pathname === '/tournaments' ? styles.tabsItemActive : ''}`}>
          <Link className={styles.tabsLink} to="/tournaments">
            <TrophyOutlined />
            <span className={styles.tabsTitle}>Турніри</span>
          </Link>
        </li>
        <li className={`${styles.tabsItem} ${pathname === '/my-bets' ? styles.tabsItemActive : ''}`}>
          <Link className={styles.tabsLink} to="/my-bets">
            <BarsOutlined />
            <span className={styles.tabsTitle}>Мої прогнози</span>
          </Link>
        </li>
        <li className={`${styles.tabsItem} ${pathname === '/chat' ? styles.tabsItemActive : ''}`}>
          <Link className={styles.tabsLink} to="/chat">
            <MessageOutlined />
            <span className={styles.tabsTitle}>Чат</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
