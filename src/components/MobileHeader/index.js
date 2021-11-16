import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Drawer, PageHeader, Button } from 'antd';
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../helpers/authHelper';
import { AuthContext } from '../../utils/contexts';
import style from './index.module.scss';

export default function MobileHeader() {
  const { pathname } = useLocation();
  const { authorized } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onReturn = () => window.history.back();
  const NormalizeTitle = () => {
    if (pathname === '/champions-league-2021') {
      return 'Ліга Чемпіонів 2021';
    }
    if (pathname === '/europa-league-2021') {
      return 'Ліга Європи 2021';
    }
    if (pathname === '/world-cup-2022') {
      return 'Чемпіонат Світу 2022';
    }
    if (pathname === '/tournaments') {
      return 'Турніри';
    }
    if (pathname === '/my-bets') {
      return 'Мої прогнози';
    }
    if (pathname === '/chat') {
      return 'Чат';
    }
    if (pathname === '/rules') {
      return 'Правила';
    }
    return 'Footbet';
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={pathname === '/rules' || pathname === '/world-cup-2022' || pathname === '/europa-league-2021' || pathname === '/champions-league-2021' ? onReturn : showDrawer}
        backIcon={pathname === '/rules' || pathname === '/world-cup-2022' || pathname === '/europa-league-2021' || pathname === '/champions-league-2021' ? <ArrowLeftOutlined /> : <MenuOutlined />}
        title={<NormalizeTitle />}
      />
      <Drawer title="Footbet.site" placement="left" onClose={onClose} visible={visible}>
        <ul className={style.drawerList}>
          <li className={style.drawerListItem}>
            <Link onClick={onClose} className={style.drawerListLink} to="/">Головна</Link>
          </li>
          <li className={style.drawerListItem}>
            <Link onClick={onClose} className={style.drawerListLink} to="/rules">Правила</Link>
          </li>
          {authorized ? (
            <>
              <li className={style.drawerListItem}>
                <Link onClick={onClose} className={style.drawerListLink} to="/profile">Мій профіль</Link>
              </li>
            </>
          ) : (
            <li className={style.drawerListItem}>
              <Link onClick={onClose} className={style.drawerListLink} to="/login">Вхід/Реєстрація</Link>
            </li>
          )}
          {authorized && (
            <li className={style.drawerListItem}>
              <Button className={style.drawerListButton} type="primary" onClick={logout}>Вийти</Button>
            </li>
          )}
          {(authorized && authorized.id === 5) && (
            <li className={style.drawerListItem}>
              <a className={style.drawerListLink} href="https://footbet.site/admin/" rel="noreferrer" target="_blank">Admin</a>
            </li>
          )}
        </ul>
      </Drawer>
    </>
  );
}
