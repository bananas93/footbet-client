import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.headerNav}>
      <ul className={styles.headerList}>
        <li className={styles.headerListItem}>
          <Link to="/">Головна</Link>
        </li>
        <li className={styles.headerListItem}>
          <Link to="/tournaments">Турніри</Link>
        </li>
        <li className={styles.headerListItem}>
          <Link to="/rules">Правила</Link>
        </li>
      </ul>
      <ul className={styles.headerAdditionalList}>
        <li className={styles.headerAdditionalListItem}>
          <Link to="/profile">Профіль</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
