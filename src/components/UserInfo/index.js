import {
  Modal, Tabs, Spin,
} from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getInfo } from '../../api/users';

export default function UserInfo({
  id, tournament, tour, showUserInfo, toggleShowUserInfo, onlineUsers,
}) {
  const { TabPane } = Tabs;
  const [userInfo, setUserInfo] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    await getInfo(id, tournament, tour)
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data);
          setUserName(res.data.result[0].user.name);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const online = onlineUsers.includes(id) ? 'online' : '';

  return (
    <Modal
      width={650}
      title={`Інформація про ${userName} (${online})`}
      visible={showUserInfo}
      onCancel={toggleShowUserInfo}
      footer={null}
    >
      <Spin spinning={loading} tip="Завантаження...">
        <Tabs>
          <TabPane tab="Точні результати" key="1">
            {
            userInfo?.matches?.filter((match) => match.bet.result === true).map((match) => (
              <div className="single-match single-match--details" key={match.id}>
                <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
                <span className="single-match__score">
                  <span className="single-match__score--data">
                    {match.homeGoals}
                    {' '}
                    -
                    {match.awayGoals}
                  </span>
                </span>
                <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
                <span className="single-match__mypredict">
                  {match.bet.homeBet}
                  {' '}
                  -
                  {' '}
                  {match.bet.awayBet}
                </span>
              </div>
            ))
          }
          </TabPane>
          <TabPane tab="Результати матчу" key="2">
            {
            userInfo?.matches?.filter((match) => match.bet.score === true).map((match) => (
              <div className="single-match single-match--details" key={match.id}>
                <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
                <span className="single-match__score">
                  <span className="single-match__score--data">
                    {match.homeGoals}
                    {' '}
                    -
                    {match.awayGoals}
                  </span>
                </span>
                <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
                <span className="single-match__mypredict">
                  {match.bet.homeBet}
                  {' '}
                  -
                  {' '}
                  {match.bet.awayBet}
                </span>
              </div>
            ))
          }
          </TabPane>
          <TabPane tab="Різниця голів" key="3">
            {
            userInfo?.matches?.filter((match) => match.bet.difference === true).map((match) => (
              <div className="single-match single-match--details" key={match.id}>
                <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
                <span className="single-match__score">
                  <span className="single-match__score--data">
                    {match.homeGoals}
                    {' '}
                    -
                    {match.awayGoals}
                  </span>
                </span>
                <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
                <span className="single-match__mypredict">
                  {match.bet.homeBet}
                  {' '}
                  -
                  {' '}
                  {match.bet.awayBet}
                </span>
              </div>
            ))
          }
          </TabPane>
          <TabPane tab="Невдача" key="5">
            {
            userInfo?.matches?.filter((match) => match.bet.empty === true).map((match) => (
              <div className="single-match single-match--details" key={match.id}>
                <span className="single-match__team single-match__team--left">{match.homeTeam.name}</span>
                <span className="single-match__score">
                  <span className="single-match__score--data">
                    {match.homeGoals}
                    {' '}
                    -
                    {match.awayGoals}
                  </span>
                </span>
                <span className="single-match__team single-match__right">{match.awayTeam.name}</span>
                <span className="single-match__mypredict">
                  {match.bet.homeBet}
                  {' '}
                  -
                  {' '}
                  {match.bet.awayBet}
                </span>
              </div>
            ))
          }
          </TabPane>
        </Tabs>
      </Spin>
    </Modal>
  );
}

UserInfo.propTypes = {
  id: PropTypes.number,
  tournament: PropTypes.number,
  tour: PropTypes.number,
  showUserInfo: PropTypes.bool,
  toggleShowUserInfo: PropTypes.func,
  onlineUsers: PropTypes.array,
};
