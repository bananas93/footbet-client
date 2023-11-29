/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import MatchCard from './subcomponents/MatchCard';
import { getInfo } from '../../../api/users';
import styles from './index.module.scss';

const UserInfo = ({
  id, tournament, showUserInfo, toggleShowUserInfo,
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const res = await getInfo(id, tournament);
      if (res.status === 200) {
        setUserInfo(res.data);
      }
    } catch (error) {
      toast.error(`Помилка ${error}`, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const {
    matchesCount, predictMatches, exactScoreCount, correctResultCount, goalDifferenceCount, fivePlusGoalsCount, favoriteTeams, user, exactScoreMatches,
  } = userInfo;

  return (
    <Modal
      title={`Інформація про ${user?.name}`}
      isOpen={showUserInfo}
      onRequestClose={toggleShowUserInfo}
      size="large"
      footer={
        <Button type="button" variant="secondary" onClick={toggleShowUserInfo}>Закрити</Button>
      }
    >
      {loading ? (
        <Loading />
      ) : (
        <Tabs>
          <TabList>
            <Tab>Статистика</Tab>
            <Tab>Улюблені команди</Tab>
            <Tab>Вгадані точно матчі</Tab>
          </TabList>
          <TabPanel>
            <ul className={styles.list}>
              <li>
                Прогнозів поставлено
                <b>{predictMatches}</b>
                {' '}
                (
                {((100 * predictMatches) / matchesCount).toFixed(2)}
                %)
              </li>
              <li>
                Вгадано точних рахунків
                <b>
                  {exactScoreCount}
                  {' '}
                </b>
                (
                {((100 * exactScoreCount) / predictMatches).toFixed(2)}
                %)
              </li>
              <li>
                Вгадані результатів
                <b>{correctResultCount}</b>
                (
                {((100 * correctResultCount) / predictMatches).toFixed(2)}
                %)
              </li>
              <li>
                Вгадано різниць
                <b>{goalDifferenceCount}</b>
                (
                {((100 * goalDifferenceCount) / predictMatches).toFixed(2)}
                %)
              </li>
              <li>
                Вгадано 5+ голів
                <b>{fivePlusGoalsCount}</b>
                (
                {((100 * fivePlusGoalsCount) / predictMatches).toFixed(2)}
                %)
              </li>
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className={styles.list}>
              {favoriteTeams?.map((team) => (
                <li key={team.team}>
                  {team.team}
                  <b>{team.points}</b>
                  {' '}
                  очок
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel>
            {exactScoreMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </TabPanel>
        </Tabs>
      )}
    </Modal>
  );
};

UserInfo.propTypes = {
  id: PropTypes.number,
  tournament: PropTypes.string,
  showUserInfo: PropTypes.bool,
  toggleShowUserInfo: PropTypes.func,
};

export default UserInfo;
