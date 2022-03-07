import PropTypes from 'prop-types';
import Dropdown from '../../../components/Dropdown';
import Table from '../../../components/Table';
import Card from '../../../components/Card';
import { columns } from '../../../helpers/tableSettings';
import Button from '../../../components/Button';

const ResultsTable = ({
  handleMenuClick, toggleFullTableModal, selectedTour, results,
}) => {
  const menu = [
    '1 Тур',
    '2 Тур',
    '3 Тур',
    '4 Тур',
    '5 Тур',
    '6 Тур',
    '1/8 фіналу',
    '1/4 фіналу',
    '1/2 фіналу',
    'Фінал',
  ];
  return (
    <Card
      title="Таблиця"
      action={(
        <>
          <Dropdown
            onClick={handleMenuClick}
            options={menu}
          >
            {`${Number(selectedTour) === 0 ? 'Обрати' : selectedTour} тур`}
          </Dropdown>
          <Button
            type="button"
            variant="link"
            onClick={toggleFullTableModal}
          >
            Повна таблиця
          </Button>
        </>
      )}
    >
      <Table
        columns={columns}
        data={results}
      />
    </Card>
  );
};

ResultsTable.propTypes = {
  handleMenuClick: PropTypes.func,
  toggleFullTableModal: PropTypes.func,
  selectedTour: PropTypes.number,
  results: PropTypes.array,
};

export default ResultsTable;
