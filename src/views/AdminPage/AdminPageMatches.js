import moment from 'moment';
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getMatches } from '../../api/matches';
import Loading from '../../components/Loading';
import 'moment/locale/uk';
import { TitleContext } from '../../utils/contexts';

moment.locale('uk');

const AdminPageMatches = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState({ status: '', message: '' });
  const { id: tournamentId } = useParams();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Матчі | Адмін панель');
  }, [setTitle]);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const res = await getMatches(tournamentId);
        if (res.status && res.status === 200) {
          setMatches(res.data);
        }
      } catch (err) {
        setError({ status: err.response.status, message: err.response.data.message });
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!loading && !matches.length) {
    return (
      <>
        <div>{error.status}</div>
        <div>{error.message}</div>
      </>
    );
  }

  const match = matches.map((group) => group.games.filter((game) => {
    const today = moment();
    const matchDate = moment(game.datetime);
    return today.diff(matchDate) <= 0;
  })).filter((n) => n.length);

  return (
    <div className="ant-table" style={{ width: '100%', overflowX: 'auto' }}>
      <table>
        <thead className="ant-table-thead">
          <tr>
            <th className="ant-table-cell">Команда</th>
            <th className="ant-table-cell">Гол</th>
            <th className="ant-table-cell">Гол</th>
            <th className="ant-table-cell">Команда</th>
            <th className="ant-table-cell">Статус</th>
            <th className="ant-table-cell">Етап</th>
            <th className="ant-table-cell">Дата</th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          {match.map((group) => group.map((game) => (
            <tr className="ant-table-row" key={game.id}>
              <td className="ant-table-cell">{game.homeTeam.name}</td>
              <td className="ant-table-cell">
                <Button size="small" type="primary" shape="circle" icon={<MinusOutlined />} />
                <strong style={{ margin: '0 5px' }}>{game.homeGoals}</strong>
                <Button size="small" type="primary" shape="circle" icon={<PlusOutlined />} />
              </td>
              <td className="ant-table-cell">
                <Button size="small" type="primary" shape="circle" icon={<MinusOutlined />} />
                <strong style={{ margin: '0 5px' }}>{game.awayGoals}</strong>
                <Button size="small" type="primary" shape="circle" icon={<PlusOutlined />} />
              </td>
              <td className="ant-table-cell">{game.awayTeam.name}</td>
              <td className="ant-table-cell">
                {game.status === 'Заплановано'
                  ? <Button type="primary" size="small">Почався</Button>
                  : <Button type="primary">Закінчився</Button>}
              </td>
              <td className="ant-table-cell">{game.stage}</td>
              <td className="ant-table-cell">{moment(game.datetime).format('LLL')}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPageMatches;
