/* eslint-disable no-shadow */
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:4000';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const roomId = 1;
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      if (Array.isArray(message)) {
        setMessages((messages) => [...messages, ...message]);
      } else {
        setMessages((messages) => [...messages, message]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      user_id: 1,
      user_name: 'David',
      message: messageBody,
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
  };

  return { messages, sendMessage };
};

export default useChat;