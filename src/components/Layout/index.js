import PropTypes from 'prop-types';
import { useState } from 'react';
import { AuthContext, SocketContext, TitleContext } from '../../utils/contexts';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';

const Layout = ({ auth, socket, children }) => {
  const [title, setTitle] = useState('Footbet');
  return (
    <AuthContext.Provider value={auth}>
      <SocketContext.Provider value={socket}>
        <TitleContext.Provider value={{ title, setTitle }}>
          <div className={`${styles.app} app`}>
            {auth && (
              <Header />
            )}
            <main className={styles.main}>
              <h1 className={styles.title}>{title}</h1>
              {children}
            </main>
            <Footer />
          </div>
        </TitleContext.Provider>
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
};

export default Layout;
