import { useState, useEffect, useContext } from 'react';
import { Tabs } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import FullTable from '../../components/FullTable';
import UserInfo from '../../components/UserInfo';
import { getMatches } from '../../api/matches';
import { getResults, getResultsByTour } from '../../api/results';
import Loading from '../../components/Loading';
import { SocketContext, TitleContext } from '../../utils/contexts';
import useMobile from '../../helpers/useMobile';
import ResultsTable from '../../components/ResultsCard';
import { getTournament } from '../../api/tournaments';
import MatchesTabs from '../../components/MatchesTabs';
import 'moment/locale/uk';
import { notificationWrapper } from '../../helpers/notification';

moment.locale('uk');
const { TabPane } = Tabs;

const TournamentPage = () => {
  const { setTitle } = useContext(TitleContext);
  const { slug } = useParams();
  const tournamentId = slug.split('-')[0];
  const [tournament, setTournament] = useState();
  const isMobile = useMobile();

  const socket = useContext(SocketContext);

  const [selectedTour, setSelectedTour] = useState('0');
  const [activeTab, setActiveTab] = useState(localStorage.getItem(`tab-${tournamentId}`) || '1');
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState([]);
  const [showFullTableModal, setShowFullTableModal] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userId, setUserId] = useState();

  const toggleFullTableModal = () => {
    setShowFullTableModal(!showFullTableModal);
  };

  const toggleShowUserInfo = (idUser) => {
    setUserId(idUser);
    setShowUserInfo(!showUserInfo);
  };

  const handleMenuClick = async (event) => {
    const { key } = event;
    setSelectedTour(key);
    try {
      const res = await getResultsByTour(tournamentId, key);
      if (res.status && res.status === 200) {
        setResults(res.data);
      }
    } catch (error) {
      notificationWrapper(true, error.message);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await getMatches(tournamentId);
      if (res.status && res.status === 200) {
        setMatches(res.data);
      }
    } catch (error) {
      notificationWrapper(true, error.message);
    }
  };

  const loadResults = async () => {
    try {
      const res = await getResults(tournamentId);
      if (res.status && res.status === 200) {
        setResults(res.data);
      }
    } catch (error) {
      notificationWrapper(true, error.message);
    }
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
    const loadTournament = async () => {
      try {
        const res = await getTournament(tournamentId);
        if (res.status && res.status === 200) {
          setTournament(res.data);
          setTitle(res.data.name);
        }
      } catch (error) {
        notificationWrapper(true, error.message);
      }
    };
    loadTournament();
  }, []);

  useEffect(() => {
    loadMatches();
    loadResults();
  }, []);

  const changeTabs = (key) => {
    localStorage.setItem(`tab-${tournamentId}`, key);
    setActiveTab(key);
  };

  if (!tournament) {
    return <Loading />;
  }
  return (
    <>
      {isMobile ? (
        <Tabs defaultActiveKey={1} centered size="large">
          <TabPane tab="Матчі" key={1}>
            <MatchesTabs
              isBets={false}
              matches={matches}
              tournament={tournament}
              loadMatches={loadMatches}
              activeTab={activeTab}
              changeTabs={changeTabs}
            />
          </TabPane>
          <TabPane tab="Результати" key={2}>
            <ResultsTable
              handleMenuClick={handleMenuClick}
              toggleFullTableModal={toggleFullTableModal}
              toggleShowUserInfo={toggleShowUserInfo}
              selectedTour={selectedTour}
              results={results}
            />
          </TabPane>
        </Tabs>
      ) : (
        <div className={styles.row}>
          <div className={styles.col}>
            <MatchesTabs
              matches={matches}
              tournament={tournament}
              loadMatches={loadMatches}
              activeTab={activeTab}
              changeTabs={changeTabs}
            />
          </div>
          <div className={styles.col}>
            <ResultsTable
              handleMenuClick={handleMenuClick}
              toggleFullTableModal={toggleFullTableModal}
              toggleShowUserInfo={toggleShowUserInfo}
              selectedTour={selectedTour}
              results={results}
            />
          </div>
        </div>
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
          tournament={tournamentId}
          tour={selectedTour}
          id={userId}
        />
      )}
    </>
  );
};

export default TournamentPage;