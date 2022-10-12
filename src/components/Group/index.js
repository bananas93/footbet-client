/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import Card from '../Card';
import Table from '../Table';

const Group = ({ groups }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Команда',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'М',
      dataIndex: 'played',
      key: 'played',
    },
    {
      title: 'В',
      dataIndex: 'won',
      key: 'won',
    },
    {
      title: 'Н',
      dataIndex: 'drawn',
      key: 'drawn',
    },
    {
      title: 'П',
      dataIndex: 'lost',
      key: 'lost',
    },
    {
      title: 'Голи',
      dataIndex: ({ goalsScored, goalsAgainst }) => `${goalsScored}:${goalsAgainst}`,
      key: 'goalsScored',
    },
    {
      title: 'Очок',
      dataIndex: 'points',
      key: 'points',
    },
  ];

  return (
    <Card>
      <Tabs style={{ textAlign: 'center' }}>
        <TabList>
          {Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0])).map((item) => (
            <Tab key={item[0]}><h4>Група {item[0]}</h4></Tab>
          ))}
        </TabList>
        {Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0])).map((item) => (
          <TabPanel key={item[0]}>
            <Table columns={columns} data={item[1]} />
          </TabPanel>
        ))}
      </Tabs>
    </Card>
  );
};

Group.propTypes = {
  groups: PropTypes.object,
};

export default Group;
