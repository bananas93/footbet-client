import {
  Card, Input, Button, Row, Col, List,
} from 'antd';

import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getUserDetails } from '../api/auth';

export default function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(async () => {
    const newSocket = io('http://footbet.herokuapp.com');
    setSocket(newSocket);
    const res = await getUserDetails();
    const { name } = res;
    newSocket.emit('login', { name });
    newSocket.emit('get online users');
    newSocket.on('get online users', (users) => {
      setOnlineUsers(users);
    });
    return () => newSocket.close();
  }, [setSocket]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setNewMessage('');
  };

  console.log(onlineUsers);

  return (
    <>
      <h1 className="site-title">Чат</h1>
      <Card>
        <Row style={{ marginTop: '30px' }} gutter={30}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 6 }} style={{ marginBottom: '30px' }}>
            {/* {onlineUsers.map((user) => (
              <span>{user}</span>
            ))} */}
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 18 }} style={{ marginBottom: '30px' }}>
            {/* <List
              className="comment-list"
              header={`${messages?.length} повідомлень`}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                <li className="chat">
                  <span className="chat__name">{item.user_name}</span>
                  <span className="chat__date">{moment.utc(item.date).local().fromNow()}</span>
                  <span className="chat__message">{item.message}</span>
                </li>
              )}
            /> */}
            <Input value={newMessage} onChange={handleNewMessageChange} rows={4} />
            <Button type="primary" onClick={handleSendMessage}>Надіслати</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
