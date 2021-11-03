import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getTournaments } from './api/tournaments';
import { getMyInfo } from './api/users';
import Chat from './components/Chat';
import SiteMenu from './components/SiteMenu';
import { AuthContext, SocketContext } from './utils/contexts';
import ProtectedRoute from './helpers/ProtectedRoute';
import { getCookie } from './helpers/authHelper';

import Home from './views/Home';
import Rules from './views/Rules';
import Matches from './views/Matches';
import UserBets from './views/UserBets';
import Profile from './views/Profile';
import Login from './views/Login';
import Error from './views/Error';

const { Header, Footer, Content } = Layout;

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [tournaments, setTournaments] = useState(() => {
    if (!authorized) return [];
    const saved = localStorage.getItem('tournaments');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(async () => {
    await getMyInfo()
      .then((res) => {
        if (res.status === 200) {
          setAuthorized(res.data);
        }
        return false;
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  useEffect(() => {
    const token = getCookie('JWToken');
    const newSocket = io(process.env.REACT_APP_BASE_URL, {
      query: { token },
    });
    setSocket(newSocket);
    newSocket.on('online', (online) => {
      online = JSON.parse(online);
      setOnlineUsers(online);
    });
    return () => {
      newSocket.off('online');
      newSocket.close();
    };
  }, []);

  const loadTournaments = async () => {
    await getTournaments()
      .then((res) => {
        if (res.status === 200) {
          setTournaments(res.data);
          window.localStorage.setItem('tournaments', JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Layout>
            <Header style={{
              background: '#fff', position: 'fixed', zIndex: 1, width: '100%',
            }}
            >
              <SiteMenu tournaments={tournaments} />
            </Header>
            <Content className="site-layout">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Home {...props} tournaments={tournaments} />
                  )}
                />
                <Route exact path="/rules" component={Rules} />
                {tournaments.length && (
                  tournaments.map((tournament) => (
                    <Route
                      path={`/${tournament.slug}`}
                      exact
                      key={tournament.id}
                      render={(props) => (
                        <Matches
                          {...props}
                          onlineUsers={onlineUsers}
                          tournament={tournament}
                        />
                      )}
                    />
                  )))}
                <Route
                  exact
                  path="/my-bets"
                  render={(props) => (
                    <UserBets {...props} tournaments={tournaments} />
                  )}
                />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route exact path="/login" component={Login} />
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footbet.site © 2021 Created by David Amerov</Footer>
            {authorized && (
              <Chat />
            )}
          </Layout>
        </BrowserRouter>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
