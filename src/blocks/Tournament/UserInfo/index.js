import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import MatchCard from './subcomponents/MatchCard';
import { getInfo } from '../../../api/users';

const UserInfo = ({
  id, tournament, tour, showUserInfo, toggleShowUserInfo,
}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const res = await getInfo(id, tournament, tour);
      if (res.status === 200) {
        setUserInfo(res.data);
        setUserName(res.data.result[0].user.name);
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

  return (
    <Modal
      title={`Інформація про ${userName}`}
      isOpen={showUserInfo}
      onRequestClose={toggleShowUserInfo}
      size="large"
      footer={
        <Button type="button" variant="secondary" onCLick={toggleShowUserInfo}>Закрити</Button>
      }
    >
      {loading ? (
        <Loading />
      ) : (

        <Tabs>
          <TabList>
            <Tab>Точні результати</Tab>
            <Tab>Результати матчу</Tab>
            <Tab>Різниця голів</Tab>
            <Tab>Невдача</Tab>
          </TabList>
          <TabPanel>
            {userInfo?.matches?.filter((match) => match.bet.result === true).map((match) => (
              <MatchCard match={match} />
            ))}
          </TabPanel>
          <TabPanel>
            {userInfo?.matches?.filter((match) => match.bet.score === true).map((match) => (
              <MatchCard match={match} />
            ))}
          </TabPanel>
          <TabPanel>
            {userInfo?.matches?.filter((match) => match.bet.difference === true).map((match) => (
              <MatchCard match={match} />
            ))}
          </TabPanel>
          <TabPanel>
            {userInfo?.matches?.filter((match) => match.bet.empty === true).map((match) => (
              <MatchCard match={match} />
            ))}
          </TabPanel>
        </Tabs>
      )}
    </Modal>
  );
};

UserInfo.propTypes = {
  id: PropTypes.number,
  tournament: PropTypes.number,
  tour: PropTypes.number,
  showUserInfo: PropTypes.bool,
  toggleShowUserInfo: PropTypes.func,
};

export default UserInfo;
