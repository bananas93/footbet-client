/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Tabs } from 'antd';
import moment from 'moment';
import FullTable from '../../components/FullTable';
import UserInfo from '../../components/UserInfo';
import { getMatches } from '../../api/matches';
import { getResults, getResultsByTour } from '../../api/results';
import 'moment/locale/uk';
import { SocketContext } from '../../utils/contexts';
import useMobile from '../../helpers/useMobile';
import MatchesCard from '../../components/Match/subcomponents/MatchesCard';
import ResultsCard from '../../components/Match/subcomponents/ResultsCard';

moment.locale('uk');
const { TabPane } = Tabs;
export default function Matches({ tournament, onlineUsers }) {
  const isMobile = useMobile();

  const socket = useContext(SocketContext);

  const [selectedTour, setSelectedTour] = useState(0);
  const [activeTab, setActiveTab] = useState(localStorage.getItem(`tab-${tournament.id}`) || 1);
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem(`matches${tournament.id}`);
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem(`results${tournament.id}`);
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
  const loadMatches = async () => {
    await getMatches(tournament.id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setMatches(res.data);
          window.localStorage.setItem(`matches${tournament.id}`, JSON.stringify(res.data));
        } else {
          window.localStorage.setItem(`matches${tournament.id}`, JSON.stringify(res.data));
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
          window.localStorage.setItem(`results${tournament.id}`, JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const updateMatch = (match) => {
    const date = match.datetime.split('T')[0];
    const newMatches = [...matches];
    const matchesTour = newMatches.findIndex((item) => item.date === date);
    // eslint-disable-next-line max-len
    const matchIndex = newMatches[matchesTour].games.findIndex((item) => Number(item.id) === Number(match.id));
    const updatedMatch = newMatches[matchesTour].games[matchIndex];
    updatedMatch.homeGoals = match.homeGoals;
    updatedMatch.awayGoals = match.awayGoals;
    updatedMatch.status = match.status;
    setMatches(newMatches);
    document.getElementById(`match - ${match.id}`).classList.add('updated');
    setTimeout(() => {
      document.getElementById(`match - ${match.id}`).classList.remove('updated');
    }, 5000);
  };

  const playNotification = () => {
    const audio = new Audio('notification.mp3');
    audio.play();
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('matchUpdate', (data) => {
      if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
        updateMatch(data);
        loadResults();
        playNotification();
      }
    });
  }, [socket]);

  useEffect(() => {
    loadMatches();
    loadResults();
    return () => {
      window.localStorage.setItem(`matches${tournament.id}`, JSON.stringify(matches));
      window.localStorage.setItem(`results${tournament.id}`, JSON.stringify(results));
    };
  }, [tournament]);

  const changeTabs = (key) => {
    localStorage.setItem(`tab - ${tournament.id}`, key);
    setActiveTab(key);
  };
  return (
    <>
      {isMobile ? (
        <Tabs defaultActiveKey={1} centered size="large">
          <TabPane tab="Матчі" key={1}>
            <MatchesCard
              isBets={false}
              matches={matches}
              tournament={tournament}
              loadMatches={loadMatches}
              activeTab={activeTab}
              changeTabs={changeTabs}
            />
          </TabPane>
          <TabPane tab="Результати" key={2}>
            <ResultsCard
              handleMenuClick={handleMenuClick}
              toggleFullTableModal={toggleFullTableModal}
              toggleShowUserInfo={toggleShowUserInfo}
              selectedTour={selectedTour}
              onlineUsers={onlineUsers}
              results={results}
            />
          </TabPane>
        </Tabs>
      ) : (
        <>
          <h1 className="site-title">{tournament.name}</h1>
          <Row gutter={16}>
            <Col className="gutter-row" sm={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: '30px' }}>
              <MatchesCard
                matches={matches}
                tournament={tournament}
                loadMatches={loadMatches}
                activeTab={activeTab}
                changeTabs={changeTabs}
              />
            </Col>
            <Col className="gutter-row" sm={{ span: 24 }} lg={{ span: 12 }}>
              <ResultsCard
                handleMenuClick={handleMenuClick}
                toggleFullTableModal={toggleFullTableModal}
                toggleShowUserInfo={toggleShowUserInfo}
                selectedTour={selectedTour}
                onlineUsers={onlineUsers}
                results={results}
              />
            </Col>
          </Row>
        </>
      )}
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
};
