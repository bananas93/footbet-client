import PropTypes from 'prop-types';
import {
  Table, Space, Dropdown, Menu,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Card from '../Card';
import { pagination, columns } from '../../helpers/tableSettings';

export default function ResultsTable({
  handleMenuClick, toggleFullTableModal, selectedTour, toggleShowUserInfo, results,
}) {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">Загальний результат</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">1 Тур</Menu.Item>
      <Menu.Item key="2">2 Тур</Menu.Item>
      <Menu.Item key="3">3 Тур</Menu.Item>
      <Menu.Item key="4">4 Тур</Menu.Item>
      <Menu.Item key="5">5 Тур</Menu.Item>
      <Menu.Item key="6">6 Тур</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7">1/8 фіналу</Menu.Item>
      <Menu.Item key="8">1/4 фіналу</Menu.Item>
      <Menu.Item key="9">1/2 фіналу</Menu.Item>
      <Menu.Item key="10">Фінал</Menu.Item>
    </Menu>
  );
  return (
    <Card
      title="Таблиця"
      action={(
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <a style={{ color: '#001628' }} href="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {`${Number(selectedTour) === 0 ? 'Обрати' : selectedTour} тур`}
              {' '}
              <DownOutlined />
            </a>
          </Dropdown>
          <button type="button" className="ant-dropdown-button" onClick={toggleFullTableModal}>Повна таблиця</button>
        </Space>
      )}
    >
      <Table
        size="small"
        pagination={pagination}
        bordered
        columns={columns}
        dataSource={results}
        rowKey="id"
        scroll={{ x: 400 }}
        onRow={(record) => ({
          onClick: () => toggleShowUserInfo(record.userId),
        })}
      />
    </Card>
  );
}

ResultsTable.propTypes = {
  handleMenuClick: PropTypes.func,
  toggleShowUserInfo: PropTypes.func,
  toggleFullTableModal: PropTypes.func,
  selectedTour: PropTypes.number,
  results: PropTypes.array,
};
