import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Tabs } from 'antd';
import moment from 'moment';
import { getMyBets } from '../../api/bets';
import MatchesCard from '../../components/Match/subcomponents/MatchesCard';
import Match from '../../components/Match';
import { normalizeTabName } from '../../helpers/normalizeTabName';
import useMobile from '../../helpers/useMobile';

const { TabPane } = Tabs;

export default function UserBets({ tournaments }) {
  const isMobile = useMobile();
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState();

  const loadMatches = async (tournament) => {
    await getMyBets(tournament)
      .then((res) => {
        if (res.status === 200) {
          setMatches(res.data);
        } else {
          setMatches([]);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  useEffect(() => {
    if (!tournaments.length) return;
    loadMatches(tournaments[0].id);
  }, [tournaments]);

  const handleTabClick = (key) => {
    loadMatches(key);
  };

  const changeTabs = (key) => {
    setActiveTab(key);
  };

  if (!tournaments.length) {
    return 'Завантаження';
  }

  return (
    <>
      {!isMobile && (
        <h1 className="site-title">Мої прогнози</h1>
      )}
      <Tabs defaultActiveKey={tournaments[0].id} onChange={handleTabClick}>
        {tournaments.map((tournament) => (
          <TabPane tab={tournament.name} key={tournament.id}>
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
                                <Match
                                  isBets
                                  loadMatches={loadMatches}
                                  key={match.id}
                                  match={match}
                                />
                              ))
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
                                <Match
                                  isBets
                                  loadMatches={loadMatches}
                                  key={match.id}
                                  match={match}
                                />
                              ))
                            }
                          </div>
                        ))
                    }
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

UserBets.propTypes = {
  tournaments: PropTypes.array,
};
