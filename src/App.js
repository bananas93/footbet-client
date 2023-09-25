import { BrowserRouter as Router } from 'react-router-dom';
import {
  useState, useEffect, Suspense, useRef,
} from 'react';
import useLocalStorage from 'use-local-storage';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import Layout from './components/Layout';
import { checkAuthorization, getCookie } from './helpers/authHelper';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { AuthRoutes } from './routes/AuthRoutes';
import Loading from './components/Loading';
import { onMessageListener, requestPermission } from './firebase';

const App = () => {
  const socketRef = useRef(null);
  const [socketIo, setSocketIo] = useState(null);
  const [user, setUser] = useState(null);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkTheme, setDarkTheme] = useLocalStorage('theme', systemPrefersDark || false);

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`);
    });
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
  }, []);

  const themeToggler = () => {
    const theme = !darkTheme;
    setDarkTheme(theme);
    document.body.setAttribute('data-theme', theme ? 'dark' : 'light');
  };

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
      toast.error(error.message, 3000);
    }
    return () => {
      socket.close();
    };
  }, []);

  const auth = checkAuthorization();

  return (
    <Router>
      <Layout
        darkTheme={darkTheme}
        themeToggler={themeToggler}
        socket={socketIo}
        user={user}
        auth={auth}
      >
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
};

export default App;
