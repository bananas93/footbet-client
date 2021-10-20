/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Row, Col, Divider, Table, Button, Tabs, Card, Space, Menu, Dropdown,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import FullTable from '../../components/FullTable';
import UserInfo from '../../components/UserInfo';
import { getMatches } from '../../api/matches';
import { getResults, getResultsByTour } from '../../api/results';
import Match from '../../components/Match';
import 'moment/locale/uk';
import { normalizeTabName } from '../../helpers/normalizeTabName';
import { pagination, columns } from '../../helpers/tableSettings';

moment.locale('uk');

export default function Matches({ socket, tournament, onlineUsers }) {
  const { TabPane } = Tabs;
  const [selectedTour, setSelectedTour] = useState(0);
  const [activeTab, setActiveTab] = useState(localStorage.getItem(`tab-${tournament.id}`) ? localStorage.getItem(`tab-${tournament.id}`) : 1);
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('matches');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('results');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [showFullTableModal, setShowFullTableModal] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userId, setUserId] = useState();

  const toggleFullTableModal = () => {
    setShowFullTableModal(!showFullTableModal);
  };

  const toggleShowUserInfo = (id) => {
    setUserId(id);
    setShowUserInfo(!showUserInfo);
  };

  const handleMenuClick = async (event) => {
    const { key } = event;
    setSelectedTour(key);
    await getResultsByTour(tournament.id, key)
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">Загальний результат</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">1 Тур</Menu.Item>
      <Menu.Item key="2">2 Тур</Menu.Item>
      <Menu.Item key="3">3 Тур</Menu.Item>
      <Menu.Item key="4">4 Тур</Menu.Item>
      <Menu.Item key="5">5 Тур</Menu.Item>
      <Menu.Item key="6">6 Тур</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7">1/8 фіналу</Menu.Item>
      <Menu.Item key="8">1/4 фіналу</Menu.Item>
      <Menu.Item key="9">1/2 фіналу</Menu.Item>
      <Menu.Item key="10">Фінал</Menu.Item>
    </Menu>
  );
  const loadMatches = async () => {
    await getMatches(tournament.id)
      .then((res) => {
        if (res.status === 200) {
          setMatches(res.data);
          window.localStorage.setItem('matches', JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const loadResults = async () => {
    await getResults(tournament.id)
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data);
          window.localStorage.setItem('results', JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  const playNotification = () => {
    const audio = new Audio('notification.mp3');
    audio.play();
  };
  useEffect(async () => {
    if (socket) {
      socket.on('matchUpdate', (data) => {
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
          loadMatches();
          loadResults();
          playNotification();
        }
      });
      return () => socket.off('matchUpdate');
    }
    return false;
  }, []);

  useEffect(() => {
    loadMatches();
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
          <Card title="Матчі">
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
            extra={(
              <Space>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a style={{ color: '#001628' }} className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    {`${Number(selectedTour) === 0 ? 'Обрати' : selectedTour} тур`}
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
              columns={columns(onlineUsers)}
              dataSource={results}
              rowKey="id"
              scroll={{ x: 400 }}
              onRow={(record) => ({
                onClick: () => toggleShowUserInfo(record.userId),
              })}
            />
          </Card>
        </Col>
      </Row>
      {showFullTableModal && (
        <FullTable
          showFullTableModal={showFullTableModal}
          toggleFullTableModal={toggleFullTableModal}
          results={results}
        />
      )}
      {showUserInfo && (
        <UserInfo
          showUserInfo={showUserInfo}
          toggleShowUserInfo={toggleShowUserInfo}
          tournament={tournament.id}
          tour={selectedTour}
          id={userId}
        />
      )}
    </>
  );
}

Matches.propTypes = {
  onlineUsers: PropTypes.array,
  tournament: PropTypes.object,
  socket: PropTypes.object,
};
