import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { logout } from '../../helpers/authHelper';
import { AuthContext } from '../../utils/contexts';

export default function SiteMenu({ tournaments }) {
  const { authorized } = useContext(AuthContext);
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Головна</Link>
      </Menu.Item>
      {tournaments.length && tournaments.map((tournament) => (
        <Menu.Item key={tournament.slug}>
          <Link to={`/${tournament.slug}`}>{tournament.name}</Link>
        </Menu.Item>
      ))}
      <Menu.Item key="rules">
        <Link to="/rules/">Правила</Link>
      </Menu.Item>
      {authorized ? (
        <>
          {/* <Menu.Item key="chat">
            <Link to="/chat">Чат</Link>
          </Menu.Item> */}
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

SiteMenu.propTypes = {
  tournaments: PropTypes.array,
};
