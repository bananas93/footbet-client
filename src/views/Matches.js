/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Row, Col, Divider, Table, Button, Tabs, Card, Space, Menu, Dropdown,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { io } from 'socket.io-client';
import FullTable from '../components/FullTable';
import { logout } from '../helpers/authHelper';
import { getMatches } from '../api/matches';
import { getResults } from '../api/results';
import Match from '../components/Match';
import 'moment/locale/uk';
import { normalizeTabName } from '../helpers/normalizeTabName';
import { pagination, columns } from '../helpers/tableSettings';

moment.locale('uk');

export default function Matches({ tournament }) {
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState(localStorage.getItem(`tab-${tournament.id}`) ? localStorage.getItem(`tab-${tournament.id}`) : 1);
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
    await getMatches(tournament.id)
      .then((res) => {
        if (res.status === 200) {
          setMatches(res.data);
        }
        if (res.status === 403) {
          logout();
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
    setLoadingMatches(false);
  };

  const loadResults = async () => {
    setLoadingResults(true);
    await getResults(tournament.id)
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data);
        }
        if (res.status === 403) {
          logout();
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
    setLoadingResults(false);
  };
  const playNotification = () => {
    const audio = new Audio('notification.mp3');
    audio.play();
  };
  useEffect(() => {
    const socket = io('https://footbet.herokuapp.com');
    socket.on('matchUpdate', () => {
      loadMatches();
      loadResults();
      playNotification();
    });
    return () => socket.close();
  }, []);

  useEffect(() => {
    loadMatches();
  }, [tournament]);

  useEffect(() => {
    loadResults();
  }, [tournament]);

  const changeTabs = (key) => {
    localStorage.setItem(`tab-${tournament.id}`, key);
    setActiveTab(key);
  };

  return (
    <>
      <h1 className="site-title">{tournament.name}</h1>
      <Row gutter={16}>
        <Col className="gutter-row" sm={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
          <Card title="Матчі" loading={loadingMatches}>
            <Tabs defaultActiveKey={activeTab} onChange={changeTabs}>
              {Array.from(Array(tournament.groupTours).keys()).map((key) => (
                <TabPane tab={`${key + 1} тур`} key={key}>
                  {
                    matches.filter((group) => group.tour === `${key + 1} тур`)
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
              {Array.from(Array(tournament.playoffTours).keys()).reverse().map((key) => (
                <TabPane tab={normalizeTabName(key)} key={key + 10}>
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
                <Button type="link" onClick={toggleFullTableModal}>Повна таблиця</Button>
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
              scroll={{ x: 400 }}
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
  tournament: PropTypes.object,
};
