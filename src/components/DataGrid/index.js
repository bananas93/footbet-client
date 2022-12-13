/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DataGrid = ({ chart }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 600,
  };

  const labels = [...chart.matches].map((match, index) => `Матч ${index}`);

  const datasets = chart.users.map(({ user_name, datagrid }) => {
    const dataset = {
      label: user_name,
      data: datagrid,
      fill: false,
      tension: 0,
      pointRadius: 5,
      pointHoverRadius: 5,
    };
    return dataset;
  });

  const data = {
    labels,
    datasets,
  };

  return (
    <Line id="graphic" data={data} options={options} />
  );
};

DataGrid.propTypes = {
  chart: PropTypes.object,
};

export default DataGrid;
