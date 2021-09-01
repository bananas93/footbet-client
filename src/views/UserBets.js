import { useState, useEffect } from 'react';
import { Card, Divider } from 'antd';
import moment from 'moment';
import Match from '../components/Match';
import { getJWToken } from '../helpers/authHelper';

export default function UserBets() {
  const [myBets, setMyBets] = useState([]);
  const tournament = 1;
  const loadMyBets = async () => {
    const token = getJWToken();
    const response = await fetch(`http://footbet.herokuapp.com/api/bets/${tournament}`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setMyBets(data);
    }
  };

  useEffect(() => {
    loadMyBets();
  }, []);
  return (
    <>
      <h1 className="site-title">Мої прогнози</h1>
      <Card>
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
      </Card>
    </>
  );
}
