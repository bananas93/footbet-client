import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../utils/contexts';
import { addBet } from '../../../api/bets';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import styles from './index.module.scss';

const PredictModal = ({
  showAddPredictModal, toggleShowAddPredictModal, match, title, myBet, setPredict,
}) => {
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');

  useEffect(() => {
    if (myBet) {
      setHome(myBet?.homeBet);
      setAway(myBet?.awayBet);
    }
  }, []);

  const onChangeInput = (type) => (e) => {
    const re = /^[0-9\b]+$/;
    if (type === 'home' && (e.target.value === '' || re.test(e.target.value))) {
      setHome(e.target.value);
    }
    if (type === 'away' && (e.target.value === '' || re.test(e.target.value))) {
      setAway(e.target.value);
    }
  };

  const changePredict = ({ homeBet, awayBet }) => {
    let newBet = {};
    if (myBet) {
      newBet = JSON.parse(JSON.stringify(myBet));
    }
    newBet.homeBet = homeBet;
    newBet.awayBet = awayBet;
    newBet.bet = `${homeBet}-${awayBet}`;
    setPredict(newBet);
  };

  const savePredict = async (e) => {
    e.preventDefault();
    if (!(Boolean(home) && Boolean(away))) {
      toast.error('Введіть коректний прогноз', 3000);
      return;
    }
    setLoading(true);
    const data = {
      homeBet: home,
      awayBet: away,
      matchId: match.id,
      tournamentId: match.tournament_id,
    };
    try {
      const res = await addBet(data);
      if (res && res.status === 201) {
        setLoading(false);
        changePredict(res.data.bet);
        toast.success(res.data.message, 3000);
        toggleShowAddPredictModal();
      }
    } catch (err) {
      setLoading(false);
      toast.error('Помилка збереження прогнозу', 3000);
    }
  };

  const { id } = useContext(UserContext);

  return (
    <Modal
      title={title}
      isOpen={showAddPredictModal}
      onRequestClose={toggleShowAddPredictModal}
      footer={(
        <>
          {(match.status === 'Заплановано' && id === 5) && (
            <Button variant="primary">Розпочався</Button>
          )}
          <Button type="button" variant="secondary" onClick={toggleShowAddPredictModal}>Закрити</Button>
          <Button form="save-predict" type="submit" variant="primary" isLoading={loading}>
            {loading ? 'Зберігання...' : 'Зберегти'}
          </Button>
        </>
      )}
    >
      <form id="save-predict" className={styles.form} method="POST" onSubmit={savePredict}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.name}>
              <span style={{ textAlign: 'left' }}>{match?.homeTeam?.name}</span>
              <input className={styles.input} name="home" type="tel" value={home} onChange={onChangeInput('home')} />
            </div>
          </div>
          <span style={{ color: '#fff' }}>-</span>
          <div className={styles.col}>
            <div className={styles.name}>
              <input className={styles.input} name="away" type="tel" value={away} onChange={onChangeInput('away')} />
              <span style={{ textAlign: 'right' }}>{match?.awayTeam?.name}</span>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

PredictModal.propTypes = {
  showAddPredictModal: PropTypes.bool,
  toggleShowAddPredictModal: PropTypes.func,
  match: PropTypes.object,
  title: PropTypes.string,
  myBet: PropTypes.object,
  setPredict: PropTypes.func,
};

export default PredictModal;
