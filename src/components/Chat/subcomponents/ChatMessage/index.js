import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export default function ChatMessage({
  message, handleMessageInput, handleSendMessage, handleSendMessageEnter,
}) {
  return (
    <div className={style.chatMessage}>
      <div className={style.chatMessageRow}>
        <input onKeyDown={handleMessageInput} onKeyPress={handleSendMessageEnter} onChange={handleMessageInput} value={message} className={style.chatMessageInput} type="text" placeholder="Напишіть повідомлення" />
        <button onClick={handleSendMessage} disabled={!message.length} className={style.chatMessageButton} type="submit">
          <SendOutlined />
        </button>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  handleMessageInput: PropTypes.func,
  handleSendMessage: PropTypes.func,
  handleSendMessageEnter: PropTypes.func,
  message: PropTypes.string,
};
