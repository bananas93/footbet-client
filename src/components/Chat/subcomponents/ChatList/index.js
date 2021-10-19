import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import { AuthContext } from '../../../../utils/contexts';
import { getMessages } from '../../../../api/chat';
import style from './index.module.scss';

export default function ChatList({ toggleShowChat, socket }) {
  const [messages, setMessages] = useState([]);
  const { authorized } = useContext(AuthContext);
  useEffect(async () => {
    await getMessages()
      .then((res) => {
        if (res.status === 200) {
          setMessages(res.data);
          setTimeout(() => {
            const chat = document.getElementById('chat-list');
            chat.scrollTo(0, chat.scrollHeight);
          }, 100);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  const handleSendMessage = (message) => {
    socket.emit('chatMessage', message);
    const newMessage = {
      id: new Date().getTime(),
      message,
      user: {
        id: authorized.id,
        name: authorized.name,
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

  socket.on('message', (msg) => {
    const oldMsg = [...messages];
    oldMsg[messages.length - 1].days.push(msg);
    setMessages(oldMsg);
    setTimeout(() => {
      const chat = document.getElementById('chat-list');
      chat.scrollTo(0, chat.scrollHeight);
    }, 100);
  });

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={style.chat}>
      <ChatHeader name={authorized.name} toggleShowChat={toggleShowChat} />
      <ul id="chat-list" className={style.chatList}>
        {messages.map((day) => (
          <div key={day.id}>
            <Divider style={{ fontWeight: 'bold' }}>{moment(day.date).format('LL')}</Divider>
            {
              day.days.map((item) => (
                <li className={`${style.chatListMessage} ${item.user.id === authorized.id ? style.chatListMessageMy : ''}`} key={item.id}>
                  <div className={style.chatListWrapper}>
                    <div className={style.chatListWrap}>
                      {item.user.id !== authorized.id && (
                      <div className={style.chatListName}>{item.user.name}</div>
                      )}
                      <div className={style.chatListText}>
                        {item.message}
                        <span className={style.chatListTime}>{moment(item.createdAt).format('HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </div>
        ))}
      </ul>
      <ChatMessage handleSendMessage={handleSendMessage} />
    </div>
  );
}
ChatList.propTypes = {
  toggleShowChat: PropTypes.func,
  socket: PropTypes.object,
};