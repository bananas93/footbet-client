import { BrowserRouter as Router } from 'react-router-dom';
import {
  useState, useEffect, Suspense, useRef,
} from 'react';
import { io } from 'socket.io-client';
import Layout from './components/Layout';
import { checkAuthorization, getCookie } from './helpers/authHelper';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { AuthRoutes } from './routes/AuthRoutes';
import Loading from './components/Loading';
import { notificationWrapper } from './helpers/notification';

function App() {
  const socketRef = useRef(null);
  const [socketIo, setSocketIo] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (socketRef.current === null) {
      const token = getCookie('JWToken');
      socketRef.current = io(process.env.REACT_APP_BASE_URL, {
        query: { token },
      });
    }

    const { current: socket } = socketRef;

    try {
      setSocketIo(socket);
      socket.open();
      socket.on('user', (data) => {
        setUser(JSON.parse(data));
      });
    } catch (error) {
      notificationWrapper(true, error.message);
    }
    return () => {
      socket.close();
    };
  }, []);

  const auth = checkAuthorization();

  return (
    <Router>
      <Layout socket={socketIo} user={user} auth={auth}>
        <Suspense fallback={<Loading />}>
          {auth ? (
            <ProtectedRoutes />
          ) : (
            <AuthRoutes />
          )}
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
