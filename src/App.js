import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { io } from 'socket.io-client';
import Layout from './components/Layout';
import { checkAuthorization, getJWToken } from './helpers/authHelper';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { AuthRoutes } from './routes/AuthRoutes';
import Loading from './components/Loading';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getJWToken();
    const newSocket = io(process.env.REACT_APP_BASE_URL, {
      query: { token },
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const auth = checkAuthorization();

  return (
    <Router>
      <Layout socket={socket} auth={auth}>
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
