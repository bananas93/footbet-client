import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import cn from 'classnames';
import { Slide, ToastContainer } from 'react-toastify';
import {
  AuthContext, SocketContext, TitleContext, UserContext,
} from '../../utils/contexts';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';

const Layout = ({
  darkTheme, themeToggler, auth, socket, user, children,
}) => {
  const [title, setTitle] = useState('Footbet');
  const value = useMemo(() => ({
    title, setTitle,
  }), [title]);

  const toastSettings = {
    position: 'top-center',
    theme: 'colored',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    delay: false,
    transition: Slide,
  };

  return (
    <AuthContext.Provider value={auth}>
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={user}>
          <TitleContext.Provider value={value}>
            <div className={cn(styles.app, 'app')}>
              {auth && (
                <Header darkTheme={darkTheme} themeToggler={themeToggler} />
              )}
              <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>
                {children}
              </main>
              <Footer />
            </div>
            <ToastContainer {...toastSettings} />
          </TitleContext.Provider>
        </UserContext.Provider>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

Layout.propTypes = {
  darkTheme: PropTypes.bool,
  themeToggler: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
    PropTypes.array,
  ]),
  socket: PropTypes.object,
  auth: PropTypes.bool,
  user: PropTypes.object,
};

export default Layout;
