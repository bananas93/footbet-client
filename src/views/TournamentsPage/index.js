import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getTournaments } from '../../api/tournaments';
import Loading from '../../components/Loading';
import styles from './index.module.scss';
import { notificationWrapper } from '../../helpers/notification';
import { TitleContext } from '../../utils/contexts';
import Card from '../../components/Card';

const TournamentsPage = () => {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Турніри');
  }, [setTitle]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTournaments = async () => {
      setLoading(true);
      try {
        const res = await getTournaments();
        if (res.status && res.status === 200) {
          setTournaments(res.data);
        }
      } catch (error) {
        notificationWrapper(true, `Помилка ${error}`);
      } finally {
        setLoading(false);
      }
    };
    loadTournaments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.row}>
      {tournaments.map((tournament) => (
        <div key={tournament.id} className={styles.col}>
          <Card>
            <Link to={`/tournament/${tournament.id}-${tournament.slug}`}>
              <img style={{ objectFit: 'contain', width: '100%', height: '150px' }} alt={tournament.name} src={tournament.logo} />
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TournamentsPage;
