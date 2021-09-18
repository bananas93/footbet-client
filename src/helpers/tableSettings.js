import { Button } from 'antd';

export const pagination = {
  pageSize: 20,
};

export const columns = [
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
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
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
