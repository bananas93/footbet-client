import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import style from './index.module.scss';

export default function ChatMessage({ handleSendMessage }) {
  const [message, setMessage] = useState('');
  const handleMessageInput = (e) => {
    setMessage(e);
  };
  const sendMessage = () => {
    setMessage('');
    handleSendMessage(message);
  };

  return (
    <div className={style.chatMessage}>
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
};
