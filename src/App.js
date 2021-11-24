import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { io } from 'socket.io-client';
import Layout from './components/Layout';
import { checkAuthorization, getCookie } from './helpers/authHelper';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { AuthRoutes } from './routes/AuthRoutes';
import Loading from './components/Loading';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('JWToken');
    const newSocket = io('http://localhost:3000', {
      query: { token },
    });
    setSocket(newSocket);
    newSocket.on('user', (data) => {
      setUser(JSON.parse(data));
    });
    return () => {
      newSocket.close();
    };
  }, []);

  const auth = checkAuthorization();

  return (
    <Router>
      <Layout socket={socket} user={user} auth={auth}>
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
