import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import style from './index.module.scss';

export default function ChatList({
  handleMessageInput, toggleShowChat, messages, handleSendMessage, handleSendMessageEnter, message,
}) {
  useEffect(() => {
    const chat = document.getElementById('chat-list');
    chat.scrollTo(0, chat.scrollHeight);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={style.chat}>
      <ChatHeader toggleShowChat={toggleShowChat} />
      <ul id="chat-list" className={style.chatList}>
        {messages.map((item) => (
          <li className={`${style.chatListMessage} ${item.my ? style.chatListMessageMy : ''}`} key={item.id}>
            <div className={style.chatListWrapper}>
              <div className={style.chatListWrap}>
                {!item.my && (
                  <div className={style.chatListName}>{item.name}</div>
                )}
                <div className={style.chatListText}>{item.message}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ChatMessage
        message={message}
        handleMessageInput={handleMessageInput}
        handleSendMessage={handleSendMessage}
        handleSendMessageEnter={handleSendMessageEnter}
      />
    </div>
  );
}
ChatList.propTypes = {
  toggleShowChat: PropTypes.func,
  handleMessageInput: PropTypes.func,
  handleSendMessage: PropTypes.func,
  handleSendMessageEnter: PropTypes.func,
  messages: PropTypes.array,
  message: PropTypes.string,
};
