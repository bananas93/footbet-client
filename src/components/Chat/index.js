import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatList from './subcomponents/ChatList';
import style from './index.module.scss';

const messagesList = [
  {
    id: 1,
    name: 'Саша',
    message: 'Але найкращий пенальті поки у Погба',
    my: false,
  },
  {
    id: 2,
    name: 'Влад',
    message: 'Зараз все рішитьмя',
    my: false,
  },
  {
    id: 3,
    name: 'Влад',
    message: 'Буде перший гол на євро',
    my: false,
  },
  {
    id: 4,
    name: 'Томаш',
    message: 'Капець',
    my: false,
  },
  {
    id: 5,
    name: 'Натан',
    message: 'Мбаппе буває)',
    my: false,
  },
  {
    id: 6,
    name: 'Давид',
    message: 'Да, Мбаппе має не забити',
    my: true,
  },
  {
    id: 7,
    name: 'Саша',
    message: 'Шкода Мбаппе',
    my: false,
  },
  {
    id: 8,
    name: 'Давид',
    message: 'Думаю Зідан новий тренер Франції',
    my: true,
  },
  {
    id: 9,
    name: 'Влад',
    message: 'Буде перший гол на євро',
    my: false,
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(messagesList);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const toggleShowChat = () => {
    setShowChat(!showChat);
  };
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    const newMessage = {
      id: new Date().getTime(),
      name: 'Давид',
      message,
      my: true,
    };
    setMessages([...messages, newMessage]);
    setMessage('');
    setTimeout(() => {
      const chat = document.getElementById('chat-list');
      chat.scrollTo(0, chat.scrollHeight);
    }, 100);
  };
  const handleSendMessageEnter = (e) => {
    if (e.charCode === 13) {
      handleSendMessage();
    }
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
        <ChatList
          messages={messages}
          handleMessageInput={handleMessageInput}
          toggleShowChat={toggleShowChat}
          handleSendMessageEnter={handleSendMessageEnter}
          handleSendMessage={handleSendMessage}
          message={message}
        />
      )}
    </>
  );
}
