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
import { getTournament } from '../../api/tournaments';
import MatchesTabs from '../../components/MatchesTabs';
import ResultsTable from '../../components/ResultsCard';
import 'moment/locale/uk';
import { notificationWrapper } from '../../helpers/notification';
import { updateMatch } from '../../helpers/updateMatch';

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
      notificationWrapper(true, error.response.data.error);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await getMatches(tournamentId);
      if (res.status && res.status === 200) {
        setMatches(res.data);
      }
    } catch (error) {
      notificationWrapper(true, error.response.data.error);
    }
  };

  const loadResults = async () => {
    try {
      const res = await getResults(tournamentId);
      if (res.status && res.status === 200) {
        setResults(res.data);
      }
    } catch (error) {
      notificationWrapper(true, error.response.data.error);
    }
  };

  useEffect(() => {
    loadMatches();
    loadResults();
  }, []);

  const playNotification = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  useEffect(() => {
    socket.on('matchUpdate', (data) => {
      if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
        updateMatch(matches, data);
        document.getElementById(`match-${data.id}`).classList.add('updated');
        setTimeout(() => {
          document.getElementById(`match-${data.id}`).classList.remove('updated');
        }, 5000);
        loadResults();
        playNotification();
      }
    });
    return () => socket.off('matchUpdate');
  }, [matches]);

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const res = await getTournament(tournamentId);
        if (res.status && res.status === 200) {
          setTournament(res.data);
          setTitle(res.data.name);
        }
      } catch (error) {
        notificationWrapper(true, error.response.data.error);
      }
    };
    loadTournament();
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
