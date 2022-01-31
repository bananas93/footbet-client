import PropTypes from 'prop-types';
import { useState } from 'react';
import cn from 'classnames';
import {
  AuthContext, SocketContext, TitleContext, UserContext,
} from '../../utils/contexts';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';
import Chat from '../Chat';

const Layout = ({
  auth, socket, user, children,
}) => {
  const [title, setTitle] = useState('Footbet');
  return (
    <AuthContext.Provider value={auth}>
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={user}>
          <TitleContext.Provider value={{ title, setTitle }}>
            <div className={cn(styles.app, 'app')}>
              {auth && (
                <Header />
              )}
              <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>
                {children}
              </main>
              <Footer />
              {(user && socket) && (
                <Chat />
              )}
            </div>
          </TitleContext.Provider>
        </UserContext.Provider>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

Layout.propTypes = {
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
