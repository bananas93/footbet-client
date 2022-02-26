import { useContext, useEffect, useState } from 'react';
import { Badge } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatList from './subcomponents/ChatList';
import style from './index.module.scss';
import { SocketContext, UserContext } from '../../utils/contexts';
import { notificationWrapper } from '../../helpers/notification';
import { getMessages, deleteMessage } from '../../api/chat';

const Chat = () => {
  const { id, name } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false);
  const [unreadedMessages, setUnreadedMessages] = useState(0);
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const toggleShowChat = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = (message) => {
    socket.emit('chatMessage', message);
    // eslint-disable-next-line max-len
    const messageId = messages[messages.length - 1].days[messages[messages.length - 1].days.length - 1].id;
    const date = new Date();
    const createdAt = date.toISOString();
    const newMessage = {
      id: messageId + 10,
      message,
      createdAt,
      user: { id, name },
    };
    const oldMsg = [...messages];
    oldMsg[messages.length - 1].days.push(newMessage);
    setMessages(oldMsg);
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await getMessages();
        if (res.status && res.status === 200) {
          setMessages(res.data);
        }
      } catch (error) {
        const { status } = error.response;
        if (status !== 404) {
          notificationWrapper(true, error.message);
        }
      }
    };

    loadMessages();
  }, [showChat]);

  useEffect(() => {
    setUnreadedMessages(Number(window.localStorage.getItem('unreaded-messages')) || 0);

    socket.on('message', (msg) => {
      setUnreadedMessages((prevState) => {
        window.localStorage.setItem('unreaded-messages', prevState + 1);
        return prevState + 1;
      });
      setMessages((prevState) => {
        const oldMsg = [...prevState];
        oldMsg[prevState.length - 1].days.push(msg);
        return oldMsg;
      });
    });

    return () => {
      socket.off('message');
      document.documentElement.style.overflow = 'unset';
    };
  }, [showChat]);

  const removeMessageFromArray = (message) => {
    const date = message.createdAt.split('T')[0];
    const newMessages = [...messages];
    const messagesDate = newMessages.findIndex((item) => item.date === date);
    // eslint-disable-next-line max-len
    const messageIndex = newMessages[messagesDate].days.findIndex((item) => Number(item.id) === Number(message.id));
    newMessages[messagesDate].days.splice(messageIndex, 1);
    setMessages(newMessages);
  };

  const removeMessage = async (item) => {
    removeMessageFromArray(item);
    try {
      await deleteMessage(item.id);
    } catch (error) {
      notificationWrapper(true, error.message);
    }
  };

  if (!showChat) {
    return (
      <div className={style.button}>
        <button onClick={toggleShowChat} type="button">
          <Badge size="default" count={unreadedMessages}>
            <MessageOutlined style={{ color: '#fff', fontSize: '25px' }} />
          </Badge>
        </button>
      </div>
    );
  }

  return (
    <ChatList
      messages={messages}
      handleSendMessage={handleSendMessage}
      toggleShowChat={toggleShowChat}
      removeMessage={removeMessage}
    />
  );
};

export default Chat;
