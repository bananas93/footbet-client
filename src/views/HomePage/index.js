import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import { getTournaments } from '../../api/tournaments';
import Loading from '../../components/Loading';
import styles from './index.module.scss';
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
        toast.error(`Помилка ${error}`, 3000);
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
      {tournaments.filter(({ archive }) => !archive).map((tournament) => (
        <div key={tournament.id} className={styles.col}>
          <Card title={tournament.name}>
            <Link to={`/tournament/${tournament.id}-${tournament.slug}`}>
              <img style={{ objectFit: 'contain', width: '100%', height: '150px' }} alt={tournament.name} src={tournament.logo} />
            </Link>
          </Card>
        </div>
      ))}
      <div className={styles.col}>
        <Card title="Архівні турніри">
          <ul>
            {tournaments.filter(({ archive }) => archive).map((tournament) => (
              <li key={tournament.id}>
                <Link to={`/tournament/${tournament.id}-${tournament.slug}`} className={styles.tournamentLink}>{tournament.name}</Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
