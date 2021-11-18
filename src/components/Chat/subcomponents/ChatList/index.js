import PropTypes from 'prop-types';
import cn from 'classnames';
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import Loading from '../../../Loading';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import { SocketContext, UserContext } from '../../../../utils/contexts';
import { getMessages } from '../../../../api/chat';
import { notificationWrapper } from '../../../../helpers/notification';
import styles from './index.module.scss';

export default function ChatList({ isPage, setUnreadedMessages, toggleShowChat }) {
  const user = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await getMessages();
        if (res.status && res.status === 200) {
          setMessages(res.data);
          const chat = document.getElementById('chat-list');
          chat.scrollTo(0, chat.scrollHeight);
        }
      } catch (error) {
        notificationWrapper(true, error.message);
      }
    };

    loadMessages();
  }, []);

  const handleSendMessage = (message) => {
    socket.emit('chatMessage', message);
    const newMessage = {
      id: new Date().getTime(),
      message,
      user: {
        id: user.id,
        name: user.name,
      },
    };
    const oldMsg = [...messages];
    oldMsg[messages.length - 1].days.push(newMessage);
    setMessages(oldMsg);
    setTimeout(() => {
      const chat = document.getElementById('chat-list');
      chat.scrollTo(0, chat.scrollHeight);
    }, 100);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (msg) => {
      setUnreadedMessages(true);
      setMessages((prevState) => {
        const oldMsg = [...prevState];
        oldMsg[prevState.length - 1].days.push(msg);
        return oldMsg;
      });
      setTimeout(() => {
        const chat = document.getElementById('chat-list');
        chat.scrollTo(0, chat.scrollHeight);
      }, 100);
    });
  }, []);

  useEffect(() => {
    setUnreadedMessages(false);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.chat}>
      {!isPage && (
        <ChatHeader name={user.name} toggleShowChat={toggleShowChat} />
      )}
      {!messages.length ? (
        <Loading />
      ) : (
        <ul id="chat-list" className={cn(styles.chatList, { [styles.chatListPage]: isPage })}>
          {messages.map((day) => (
            <div key={day.id}>
              <Divider styles={{ fontWeight: 'bold' }}>{moment(day.date).format('LL')}</Divider>
              {day.days.map((item) => (
                <li
                  className={
                    cn(styles.chatListMessage, {
                      [styles.chatListMessageMy]: item.user.id === user.id,
                    })
                  }
                  key={item.id}
                >
                  <div className={styles.chatListWrapper}>
                    <div className={styles.chatListWrap}>
                      {item.user.id !== user.id && (
                        <div className={styles.chatListName}>{item.user.name}</div>
                      )}
                      <div className={styles.chatListText}>
                        {item.message}
                        <span className={styles.chatListTime}>{moment(item.createdAt).format('HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          ))}
        </ul>
      )}
      <ChatMessage isPage handleSendMessage={handleSendMessage} />
    </div>
  );
}
ChatList.propTypes = {
  toggleShowChat: PropTypes.func,
  setUnreadedMessages: PropTypes.func,
  isPage: PropTypes.bool,
};
