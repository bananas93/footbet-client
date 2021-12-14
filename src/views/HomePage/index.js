import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getTournaments } from '../../api/tournaments';
import Loading from '../../components/Loading';
import styles from './index.module.scss';
import { notificationWrapper } from '../../helpers/notification';
import { TitleContext } from '../../utils/contexts';

const HomePage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Головна');
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
          <div className={styles.card}>
            <Link to={`/tournament/${tournament.id}-${tournament.slug}`}>
              <img style={{ objectFit: 'contain', width: '100%', height: '150px' }} alt={tournament.name} src={tournament.logo} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
