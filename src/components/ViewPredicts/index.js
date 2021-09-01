/* eslint-disable no-underscore-dangle */
import { Modal, Table } from 'antd';
import PropTypes from 'prop-types';

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
      <div style={{ marginBottom: '20px' }}>
        <strong>
          {match.homeTeam.name}
          {' '}
          {match.homeGoals}
          {' '}
          -
          {' '}
          {match.awayGoals}
          {' '}
          {match.awayTeam.name}
        </strong>
      </div>
      <Table
        size="small"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={match.bets}
      />
    </Modal>
  );
}

ViewPredicts.propTypes = {
  match: PropTypes.object,
  showPredictsModal: PropTypes.bool,
  toggleShowPredictsModal: PropTypes.func,
};
