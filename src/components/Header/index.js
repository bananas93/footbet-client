import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from './index.module.scss';

const Header = memo(({ darkTheme, themeToggler }) => (
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
        <li>
          <Button
            type="button"
            variant="link"
            onClick={themeToggler}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {darkTheme ? (
              <svg
                fill="#e0e0e2"
                viewBox="0 0 20 20"
                width="24"
                height="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                fill="#e0e0e2"
                viewBox="0 0 20 20"
                width="24"
                height="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            )}
          </Button>
        </li>
      </ul>
    </nav>
  </header>
));

Header.propTypes = {
  darkTheme: PropTypes.bool,
  themeToggler: PropTypes.func,
};

export default Header;
