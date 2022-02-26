import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { getTournaments } from '../../api/tournaments';
import { notificationWrapper } from '../../helpers/notification';
import { TitleContext } from '../../utils/contexts';

const AdminPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Адмін панель');
  }, [setTitle]);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const res = await getTournaments();
        if (res.status && res.status === 200) {
          setTournaments(res.data);
        }
      } catch (error) {
        notificationWrapper(true, `Помилка ${error}`);
      }
    };
    loadTournaments();
  }, []);

  return (
    <List
      bordered
      dataSource={tournaments}
      renderItem={(tournament) => (
        <List.Item>
          <Link to={`matches/${tournament.id}`}>
            {tournament.name}
          </Link>
        </List.Item>
      )}
    />
  );
};

export default AdminPage;
