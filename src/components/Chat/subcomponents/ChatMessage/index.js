import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import style from './index.module.scss';
import { UserContext, SocketContext } from '../../../../utils/contexts';

export default function ChatMessage({ handleSendMessage }) {
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useContext(SocketContext);
  const handleMessageInput = (e) => {
    setMessage(e);
    const { name } = user;
    if (e) {
      socket.emit('messageTyping', { name, typing: true });
    } else {
      socket.emit('messageTyping', { name, typing: false });
    }
  };
  const sendMessage = () => {
    setMessage('');
    handleSendMessage(message);
  };

  useEffect(() => {
    const { name } = user;
    socket.on('typingUsers', (data) => {
      setTypingUsers(data);
    });
    return () => {
      socket.emit('messageTyping', { name, typing: false });
    };
  }, []);

  return (
    <div className={style.chatMessage}>
      <span className={style.chatMessageTyping}>
        {typingUsers.map((userName, index) => `${index ? ', ' : ''} ${userName}`)}
        {' '}
        {typingUsers.length ? ' набирає повідомлення...' : ''}
      </span>
      <div className={style.chatMessageRow} id="message">
        <InputEmoji
          onEnter={sendMessage}
          onChange={handleMessageInput}
          value={message}
          fontFamily="Rubik"
          height={40}
          placeholder="Напишіть повідомлення"
        />
        <button onClick={sendMessage} disabled={!message.length} className={style.chatMessageButton} type="submit">
          <SendOutlined />
        </button>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  handleSendMessage: PropTypes.func,
};
