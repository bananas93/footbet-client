/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import {
  Row, Col, Divider, Table, Button, Tabs, Card, Space, Menu, Dropdown,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AuthContext } from '../utils/contexts';
import FullTable from '../components/FullTable';
import { getJWToken, logout } from '../helpers/authHelper';
import Match from '../components/Match';
import 'moment/locale/uk';
import { pagination, columns } from '../helpers/tableSettings';

moment.locale('uk');

export default function Matches({ tournament }) {
  const { authorized, setAuthorized } = useContext(AuthContext);
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState(localStorage.getItem('tab') ? localStorage.getItem('tab') : 1);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState([]);
  const [showFullTableModal, setShowFullTableModal] = useState(false);

  const toggleFullTableModal = () => {
    setShowFullTableModal(!showFullTableModal);
  };
  const handleMenuClick = (e) => {
    const { key } = e;
    console.log(key);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">1 Тур</Menu.Item>
      <Menu.Item key="1">2 Тур</Menu.Item>
      <Menu.Item key="2">3 Тур</Menu.Item>
      <Menu.Item key="3">4 Тур</Menu.Item>
      <Menu.Item key="4">5 Тур</Menu.Item>
      <Menu.Item key="5">6 Тур</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">1/8 фіналу</Menu.Item>
      <Menu.Item key="7">1/4 фіналу</Menu.Item>
      <Menu.Item key="8">1/2 фіналу</Menu.Item>
      <Menu.Item key="9">Фінал</Menu.Item>
    </Menu>
  );
  const loadMatches = async () => {
    setLoadingMatches(true);
    const token = getJWToken();
    const response = await fetch(`https://footbet.herokuapp.com/api/matches/${tournament}`, {
      headers: new Headers({
        Authorization: token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setMatches(data);
      setLoadingMatches(false);
    }
    if (response.status === 403) {
      setAuthorized(false);
      logout();
    }
    setLoadingMatches(false);
  };

  const loadResults = async () => {
    setLoadingResults(true);
    const token = getJWToken();
    const response = await fetch(`https://footbet.herokuapp.com/api/results/${tournament}`, {
      headers: new Headers({
        Authorization: token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setResults(data);
      setLoadingResults(false);
    }
    if (response.status === 403) {
      setAuthorized(false);
      logout();
    }
    setLoadingResults(false);
  };

  const reloadData = () => {
    loadMatches();
    loadResults();
  };
  if (authorized) {
    useEffect(() => {
      loadMatches();
    }, [tournament]);

    useEffect(() => {
      loadResults();
    }, [tournament]);
  }
  const changeTabs = (key) => {
    localStorage.setItem('tab', key);
    setActiveTab(key);
  };
  const normalizeTabName = (key) => {
    if (key === 7) {
      return '1/8 фіналу';
    }
    if (key === 8) {
      return '1/4 фіналу';
    }
    if (key === 9) {
      return '1/2 фіналу';
    }
    if (key === 10) {
      return 'Фінал';
    }
    return `${key} тур`;
  };
  return (
    <>
      <h1 className="site-title">{tournament === '1' ? 'Ліга Чемпіонів 2020/2021' : 'Тестові матчі'}</h1>
      <Row gutter={16}>
        <Col className="gutter-row" sm={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
          <Card title="Матчі" loading={loadingMatches} extra={<Button type="link" onClick={reloadData}>Оновити</Button>}>
            {tournament === '1' ? (
              <Tabs defaultActiveKey={activeTab} onChange={changeTabs}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
                  <TabPane tab={normalizeTabName(key)} key={key}>
                    {
                    matches.filter((group) => group.tour === normalizeTabName(key))
                      .map((group) => (
                        <div key={group.id}>
                          <Divider style={{ fontWeight: 'bold' }}>{moment(group.date).format('LL')}</Divider>
                          {
                          group.games.map((match) => (
                            <Match loadMatches={loadMatches} key={match.id} match={match} />))
                          }
                        </div>
                      ))
                  }
                  </TabPane>
                ))}
              </Tabs>
            ) : (
              matches.map((group) => (
                <div key={group.id}>
                  <Divider style={{ fontWeight: 'bold' }}>{moment(group.date).format('LL')}</Divider>
                  {
                      group.games.map((match) => (
                        <Match loadMatches={loadMatches} key={match.id} match={match} />))
                      }
                </div>
              ))
            )}
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 24 }} lg={{ span: 12 }}>
          <Card
            title="Таблиця"
            loading={loadingResults}
            extra={(
              <Space>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a style={{ color: '#001628' }} className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Обрати тур
                    {' '}
                    <DownOutlined />
                  </a>
                </Dropdown>
                |
                <Button type="link" onClick={toggleFullTableModal}>Повна таблиця</Button>
                |
                <Button type="link" onClick={reloadData}>Оновити</Button>
              </Space>
              )}
          >
            <Table
              size="small"
              pagination={pagination}
              bordered
              columns={columns}
              dataSource={results}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
      <FullTable
        showFullTableModal={showFullTableModal}
        toggleFullTableModal={toggleFullTableModal}
        results={results}
      />
    </>
  );
}

Matches.propTypes = {
  tournament: PropTypes.string,
};
