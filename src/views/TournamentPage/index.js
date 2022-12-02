import { useState, useEffect, useContext } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import FullTable from '../../blocks/Tournament/FullTable';
import UserInfo from '../../blocks/Tournament/UserInfo';
import { getMatches } from '../../api/matches';
import { getResults, getResultsByTour, getResultsChart } from '../../api/results';
import Loading from '../../components/Loading';
import { SocketContext, TitleContext } from '../../utils/contexts';
import useMobile from '../../helpers/useMobile';
import { getTournament } from '../../api/tournaments';
import MatchesTabs from '../../blocks/Tournament/MatchesTabs';
import ResultsTable from '../../blocks/Tournament/ResultsCard';
import { updateMatch } from '../../helpers/updateMatch';

import 'moment/locale/uk';
import Group from '../../components/Group';
import { getTournamentGroups } from '../../api/groups';
import DataGrid from '../../components/DataGrid';
import Card from '../../components/Card';

moment.locale('uk');

const TournamentPage = () => {
  const [loading, setLoading] = useState(true);
  const { setTitle } = useContext(TitleContext);
  const { slug } = useParams();
  const tournamentId = slug.split('-')[0];
  const [tournament, setTournament] = useState();
  const isMobile = useMobile();

  const socket = useContext(SocketContext);

  const [selectedTour, setSelectedTour] = useState(0);
  const [activeTab, setActiveTab] = useState(localStorage.getItem(`tab-${tournamentId}`) || 1);
  const [matches, setMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [results, setResults] = useState([]);
  const [chart, setChart] = useState([]);
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

  const handleMenuClick = async (key) => {
    setSelectedTour(key);
    try {
      const res = await getResultsByTour(tournamentId, key);
      if (res.status && res.status === 200) {
        setResults(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.error, 3000);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await getMatches(tournamentId);
      if (res.status && res.status === 200) {
        setMatches(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.error || error.message, 3000);
    }
  };

  const loadResults = async () => {
    try {
      const res = await getResults(tournamentId);
      if (res.status && res.status === 200) {
        setResults(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.error || error.message, 3000);
    }
  };

  useEffect(() => {
    Promise.all([
      getMatches(tournamentId),
      getResults(tournamentId),
      getTournamentGroups(tournamentId),
      getResultsChart(tournamentId),
    ])
      .then((res) => {
        setMatches(res[0].data);
        setResults(res[1].data);
        setGroups(res[2].data);
        setChart(res[3].data);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.message, 3000);
      })
      .finally(() => setLoading(false));
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
        setTimeout(() => {
          loadResults();
        }, 1000);
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
        toast.error(error.response.data.error || error.message, 3000);
      }
    };
    loadTournament();
  }, []);

  const changeTabs = (key) => {
    localStorage.setItem(`tab-${tournamentId}`, Number(key));
    setActiveTab(Number(key));
  };

  if (!tournament || loading) {
    return <Loading />;
  }

  return (
    <>
      {isMobile ? (
        <Tabs style={{ textAlign: 'center' }}>
          <TabList>
            <Tab>Матчі</Tab>
            <Tab>Результати</Tab>
            <Tab>Групи</Tab>
            <Tab>Графік</Tab>
          </TabList>
          <TabPanel>
            <MatchesTabs
              matches={matches}
              tournament={tournament}
              loadMatches={loadMatches}
              activeTab={Number(activeTab)}
              changeTabs={changeTabs}
            />
          </TabPanel>
          <TabPanel>
            <ResultsTable
              handleMenuClick={handleMenuClick}
              toggleFullTableModal={toggleFullTableModal}
              toggleShowUserInfo={toggleShowUserInfo}
              selectedTour={selectedTour}
              results={results}
            />
          </TabPanel>
          <TabPanel>
            <Group
              groups={groups}
              tournament={tournamentId}
            />
          </TabPanel>
          <TabPanel>
            <DataGrid chart={chart} />
          </TabPanel>
        </Tabs>
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <MatchesTabs
                matches={matches}
                tournament={tournament}
                loadMatches={loadMatches}
                activeTab={Number(activeTab)}
                changeTabs={changeTabs}
              />
            </div>
            <div className={styles.col}>
              <div style={{ marginBottom: '16px' }}>
                <ResultsTable
                  handleMenuClick={handleMenuClick}
                  toggleFullTableModal={toggleFullTableModal}
                  toggleShowUserInfo={toggleShowUserInfo}
                  selectedTour={selectedTour}
                  results={results}
                />
              </div>
              <div>
                <Group
                  groups={groups}
                  tournament={tournamentId}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <Card>
                <DataGrid chart={chart} />
              </Card>
            </div>
          </div>
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
          tournament={tournamentId}
          tour={selectedTour}
          id={userId}
        />
      )}
    </>
  );
};

export default TournamentPage;
