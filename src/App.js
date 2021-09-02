import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from './helpers/authHelper';
import { AuthContext } from './utils/contexts';
import ProtectedRoute from './helpers/ProtectedRoute';
import SiteMenu from './components/SiteMenu';
import Home from './views/Home';
import Rules from './views/Rules';
import Matches from './views/Matches';
import UserBets from './views/UserBets';
import Chat from './views/Chat';
import Profile from './views/Profile';
import Login from './views/Login';

const setToken = () => {
  const href = new URL(window.location.href);
  const token = href.searchParams.get('token');
  if (token) {
    setCookie('JWToken', token);
  }
};

const checkAuthorization = () => {
  const token = getCookie('JWToken');
  if (token) {
    return true;
  }
  return false;
};

function App() {
  const { Header, Footer, Content } = Layout;
  const [authorized, setAuthorized] = useState(checkAuthorization());

  useEffect(() => {
    setToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      <BrowserRouter>
        <Layout>
          <Header style={{
            background: '#fff', position: 'fixed', zIndex: 1, width: '100%',
          }}
          >
            <SiteMenu />
          </Header>
          <Content className="site-layout">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/rules" component={Rules} />
              <Route
                path="/test-matches"
                render={(props) => (
                  <Matches {...props} tournament="2" />
                )}
              />
              <Route
                path="/champions-league-2022"
                render={(props) => (
                  <Matches {...props} tournament="1" />
                )}
              />
              <ProtectedRoute exact path="/chat" component={Chat} />
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
