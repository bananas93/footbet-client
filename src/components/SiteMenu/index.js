import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Menu, Button } from 'antd';
import { logout } from '../../helpers/authHelper';
import { AuthContext } from '../../utils/contexts';

export default function SiteMenu() {
  const { authorized } = useContext(AuthContext);
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Головна</Link>
      </Menu.Item>
      <Menu.Item key="test-matches">
        <Link to="/test-matches">Тестові матчі</Link>
      </Menu.Item>
      <Menu.Item key="champions-league-2022">
        <Link to="/champions-league-2022/">Ліга Чемпіонів</Link>
      </Menu.Item>
      <Menu.Item key="rules">
        <Link to="/rules/">Правила</Link>
      </Menu.Item>
      {authorized ? (
        <>
          <Menu.Item key="chat">
            <Link to="/chat">Чат</Link>
          </Menu.Item>
          <Menu.Item key="my-bets">
            <Link to="/my-bets">Мої прогнози</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">Мій профіль</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="text" onClick={logout}>Вийти</Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="sign-in">
          <Link to="/login">Вхід/Реєстрація</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}
