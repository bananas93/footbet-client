import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import { Divider, Empty } from 'antd';
import Loading from '../../../Loading';
import ChatHeader from '../ChatHeader';
import ChatMessage from '../ChatMessage';
import { UserContext } from '../../../../utils/contexts';
import styles from './index.module.scss';
import Message from './subcomponents/Message';

export default function ChatList({
  messages, handleSendMessage, toggleShowChat, removeMessage, editMessage,
}) {
  const { id, name } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    window.localStorage.setItem('unreaded-messages', 0);

    setTimeout(() => {
      setLoading(false);
      const chat = document?.getElementById('chat-list');
      chat?.scrollTo(0, chat.scrollHeight);
    }, 100);
  }, []);

  return (
    <div className={styles.chat}>
      <ChatHeader name={name} toggleShowChat={toggleShowChat} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {messages.length < 1 ? (
            <div className={styles.chatEmpty}>
              <Empty description="Повідомлень ще немає 😢" />
            </div>
          ) : (
            <ul id="chat-list" className={styles.chatList}>
              {messages.map((day) => (
                <div key={day.id}>
                  <Divider styles={{ fontWeight: 'bold' }}>{moment(day.date).format('LL')}</Divider>
                  <TransitionGroup component="ul" className="todo-list">
                    {day.days.map((item) => (
                      <CSSTransition
                        key={item.id}
                        classNames="item"
                        timeout={200}
                      >
                        <Message
                          id={id}
                          item={item}
                          removeMessage={removeMessage}
                          editMessage={editMessage}
                        />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </div>
              ))}
            </ul>
          )}
        </>
      )}
      <ChatMessage handleSendMessage={handleSendMessage} />
    </div>
  );
}
ChatList.propTypes = {
  toggleShowChat: PropTypes.func,
  messages: PropTypes.array,
  handleSendMessage: PropTypes.func,
  removeMessage: PropTypes.func,
  editMessage: PropTypes.func,
};
