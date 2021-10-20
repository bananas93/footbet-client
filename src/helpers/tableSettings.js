import { Badge } from 'antd';

export const pagination = {
  pageSize: 20,
};

export const columns = (onlineUsers) => [
  {
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
    width: '5%',
  },
  {
    title: 'Ім\'я',
    dataIndex: 'user_name',
    key: 'name',
    render: (text, index) => {
      const { userId } = index;
      if (onlineUsers.includes(userId)) {
        return (
          <Badge status="success" dot offset={[5, 5]}>
            {text}
          </Badge>
        );
      }
      return text;
    },
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
