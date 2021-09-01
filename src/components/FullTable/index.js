import { Modal, Table } from 'antd';
import PropTypes from 'prop-types';

const pagination = {
  pageSize: 20,
};

const columns = [
  {
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Ім\'я',
    dataIndex: 'user_name',
    key: 'name',
  },
  {
    title: 'Матчів',
    dataIndex: 'matches',
    key: 'matches',
  },
  {
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Різниця',
    dataIndex: 'difference',
    key: 'difference',
  },
  {
    title: '5+ голів',
    dataIndex: 'goals5',
    key: 'goals5',
  },
  {
    title: 'Точний',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Очок',
    dataIndex: 'all',
    key: 'all',
  },
];
export default function FullTable({ results, showFullTableModal, toggleFullTableModal }) {
  return (
    <Modal
      width={650}
      title="Повна таблиця"
      visible={showFullTableModal}
      onCancel={toggleFullTableModal}
      footer={null}
    >
      <Table
        size="small"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={results}
        scroll={{ x: '400' }}
        rowKey="id"
      />
    </Modal>
  );
}

FullTable.propTypes = {
  results: PropTypes.array,
  showFullTableModal: PropTypes.bool,
  toggleFullTableModal: PropTypes.func,
};
