/* eslint-disable no-underscore-dangle */
import { Modal, Table } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const pagination = {
  pageSize: 20,
};

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

export default function ViewPredicts({ showPredictsModal, toggleShowPredictsModal, match }) {
  return (
    <Modal
      width={570}
      title="Прогнози на матч"
      visible={showPredictsModal}
      onCancel={toggleShowPredictsModal}
      footer={null}
    >
      <div className={styles.row}>
        <span className={styles.team}>{match.homeTeam.name}</span>
        <img className={styles.logo} src={`/logos/${match.homeTeam.id}.png`} alt={match.homeTeam.name} />
        <div className={styles.goals}>
          <span className={styles.goal}>{match.homeGoals}</span>
          <span className={styles.separator}>-</span>
          <span className={styles.goal}>{match.awayGoals}</span>
        </div>
        <img className={styles.logo} src={`/logos/${match.awayTeam.id}.png`} alt={match.awayTeam.name} />
        <span className={`${styles.team} ${styles.teamLast}`}>{match.awayTeam.name}</span>
      </div>
      <Table
        size="small"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={match.bets}
        rowKey="id"
      />
    </Modal>
  );
}

ViewPredicts.propTypes = {
  match: PropTypes.object,
  showPredictsModal: PropTypes.bool,
  toggleShowPredictsModal: PropTypes.func,
};
