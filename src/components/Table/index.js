import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const Table = ({ data, columns, onRow }) => {
  const getDataValue = (item, dataIndex, index) => {
    if (typeof dataIndex === 'object') {
      return item.user.name;
    }
    if (typeof dataIndex === 'function') {
      return dataIndex(item);
    }
    if (dataIndex === 'index') {
      return index;
    }
    return item[dataIndex];
  };

  return (
    <div className={styles['table-wrap']}>
      <table className={cn(styles.table, { [styles.tableHover]: onRow })}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} style={onRow && { cursor: 'pointer' }} onClick={onRow ? () => onRow(item) : undefined}>
              {Object.values(columns).map((value) => (
                <td key={value.key}>{getDataValue(item, value.dataIndex, index + 1)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  onRow: PropTypes.func,
};

export default Table;
