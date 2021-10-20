import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Tabs } from 'antd';
import { getJWToken } from '../../helpers/authHelper';

export default function UserBets({ tournaments }) {
  const { TabPane } = Tabs;
  const [myBets, setMyBets] = useState([]);
  const loadMyBets = async (tournament) => {
    const token = getJWToken();
    const response = await fetch(`${process.env.REACT_APP_LOCAL_API}/bets/${tournament}`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setMyBets(data);
    }
  };
  const handleTabClick = (key) => {
    loadMyBets(key);
  };
  return (
    <>
      <h1 className="site-title">Мої прогнози</h1>
      <Card>
        {tournaments.length && (
        <Tabs defaultActiveKey={tournaments[0].id} onChange={handleTabClick}>

            { tournaments.map((tournament) => (
              <TabPane tab={tournament.name} key={tournament.id}>
                {
                myBets.map((bet) => (
                  <div key={bet.id}>
                    <Divider style={{ fontWeight: 'bold' }}>
                      {bet.match.homeTeam.name}
                      {' '}
                      {bet.homeBet}
                      {' '}
                      -
                      {' '}
                      {bet.awayBet}
                      {' '}
                      {bet.match.awayTeam.name}
                    </Divider>
                  </div>
                ))
              }
              </TabPane>
            ))}
        </Tabs>
        )}
      </Card>
    </>
  );
}

UserBets.propTypes = {
  tournaments: PropTypes.array,
};
