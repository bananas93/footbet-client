import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { AuthContext } from './utils/contexts';
import ProtectedRoute from './helpers/ProtectedRoute';
import { checkAuthorization } from './helpers/authHelper';
import SiteMenu from './components/SiteMenu';
import { getTournaments } from './api/tournaments';
import Home from './views/Home';
import Rules from './views/Rules';
import Matches from './views/Matches';
import UserBets from './views/UserBets';
import Chat from './views/Chat';
import Profile from './views/Profile';
import Login from './views/Login';

function App() {
  const { Header, Footer, Content } = Layout;
  const [authorized, setAuthorized] = useState(checkAuthorization());
  const [tournaments, setTournaments] = useState([]);

  useEffect(async () => {
    await getTournaments()
      .then((res) => {
        setTournaments(res);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
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
                      <Matches {...props} tournament={tournament.id} />
                    )}
                  />
                )))}
              {/* <ProtectedRoute exact path="/chat" component={Chat} /> */}
              <ProtectedRoute exact path="/my-bets" component={UserBets} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route path="*">
                <div>Error 404</div>
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footbet.site © 2021 Created by David Amerov</Footer>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
