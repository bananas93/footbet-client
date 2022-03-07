/* eslint-disable no-underscore-dangle */
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import styles from './index.module.scss';
import Button from '../../../components/Button';
import { UserContext } from '../../../utils/contexts';

const columns = [
  {
    title: 'Ім\'я',
    dataIndex: ['user', 'name'],
    key: 'display_name',
  },
  {
    title: 'Прогноз',
    dataIndex: 'bet',
    key: 'prediction',
  },
  {
    title: 'Очок',
    dataIndex: 'points',
    key: 'points',
  },
];

const ViewPredicts = ({ showPredictsModal, toggleShowPredictsModal, match }) => {
  const { id } = useContext(UserContext);

  return (
    <Modal
      isOpen={showPredictsModal}
      onRequestClose={toggleShowPredictsModal}
      title="Прогнози на матч"
    >
      <>
        <div className={styles.row}>
          <span className={styles.team}>{match.homeTeam.name}</span>
          <img className={styles.logo} src={`/logos/${match.homeTeam.id}.png`} alt={match.homeTeam.name} />
          <div className={cn(styles.goals, { [styles.goalsLive]: match.status === 'Live' })}>
            <span className={styles.goal}>{match.homeGoals}</span>
            <span className={styles.separator}>-</span>
            <span className={styles.goal}>{match.awayGoals}</span>
          </div>
          <img className={styles.logo} src={`/logos/${match.awayTeam.id}.png`} alt={match.awayTeam.name} />
          <span className={cn(styles.team, styles.teamLast)}>{match.awayTeam.name}</span>
        </div>
        <Table
          columns={columns}
          data={match.bets}
          bordered
          rowKey="id"
        />
        {(match.status === 'Live' && id === 5) && (
        <div style={{ marginTop: '30px', justifyContent: 'space-between' }} className={styles.row}>
          <div className={styles.col}>
            <Button variant="primary">
              {match.homeTeam.name}
              {' '}
              забив
            </Button>
          </div>
          <div className={styles.col}>
            <Button variant="primary">
              {match.awayTeam.name}
              {' '}
              забив
            </Button>
          </div>
        </div>
        )}
      </>
    </Modal>
  );
};
ViewPredicts.propTypes = {
  match: PropTypes.object,
  showPredictsModal: PropTypes.bool,
  toggleShowPredictsModal: PropTypes.func,
};

export default ViewPredicts;
