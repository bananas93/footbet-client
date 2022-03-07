import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import Table from '../../../components/Table';

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
const FullTable = ({ results, showFullTableModal, toggleFullTableModal }) => (
  <Modal
    title="Повна таблиця"
    isOpen={showFullTableModal}
    onRequestClose={toggleFullTableModal}
    size="large"
  >
    <Table
      columns={columns}
      data={results}
    />
  </Modal>
);

FullTable.propTypes = {
  results: PropTypes.array,
  showFullTableModal: PropTypes.bool,
  toggleFullTableModal: PropTypes.func,
};

export default FullTable;
