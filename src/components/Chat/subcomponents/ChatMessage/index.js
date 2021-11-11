import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import style from './index.module.scss';
import { AuthContext, SocketContext } from '../../../../utils/contexts';

export default function ChatMessage({ isPage, handleSendMessage }) {
  const [message, setMessage] = useState('');
  const { authorized } = useContext(AuthContext);
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useContext(SocketContext);
  const handleMessageInput = (e) => {
    setMessage(e);
    const { name } = authorized;
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
    const cleanup = () => {
      const { name } = authorized;
      socket.emit('messageTyping', { name, typing: false });
    };
    window.addEventListener('beforeunload', cleanup);

    socket.on('typingUsers', (data) => {
      setTypingUsers(data);
    });
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  return (
    <div className={`${style.chatMessage} ${isPage ? style.chatMessagePage : ''}`}>
      <span className={style.chatMessageTyping}>
        {typingUsers.map((user, index) => `${index ? ', ' : ''} ${user}`)}
        {' '}
        {typingUsers.length ? ' набирає повідомлення...' : ''}
      </span>
      <div className={style.chatMessageRow} id="message">
        <InputEmoji
          onEnter={sendMessage}
          onChange={handleMessageInput}
          value={message}
          fontFamily="Nunito"
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
  isPage: PropTypes.bool,
};
