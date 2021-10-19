import PropTypes from 'prop-types';
import { useState } from 'react';
import { Badge } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatList from './subcomponents/ChatList';
import style from './index.module.scss';

export default function Chat({ socket }) {
  const [showChat, setShowChat] = useState(false);

  const toggleShowChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      {!showChat ? (
        <div className={style.button}>
          <button onClick={toggleShowChat} type="button">
            <Badge size="default" dot>
              <MessageOutlined style={{ color: '#fff', fontSize: '25px' }} />
            </Badge>
          </button>
        </div>
      ) : (
        <ChatList socket={socket} toggleShowChat={toggleShowChat} />
      )}
    </>
  );
}
Chat.propTypes = {
  socket: PropTypes.object,
};
