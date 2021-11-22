import PropTypes from 'prop-types';
import cn from 'classnames';
import { Dropdown } from 'antd';
import moment from 'moment';
import MessageMenu from '../MessageMenu';
import styles from './index.module.scss';

const Message = ({ item, id, removeMessage }) => (
  <li
    className={
      cn(styles.chatListMessage, {
        [styles.chatListMessageMy]: item.user.id === id,
      })
    }
  >
    <Dropdown disabled={item.user.id !== id} overlay={<MessageMenu removeMessage={removeMessage} message={item} />} trigger={['contextMenu']}>
      <div className={styles.chatListWrapper}>
        <div className={styles.chatListWrap}>
          {item.user.id !== id && (
            <div className={styles.chatListName}>{item.user.name}</div>
          )}
          <div className={styles.chatListText}>
            {item.message}
            <span className={styles.chatListTime}>{moment(item.createdAt).format('HH:mm')}</span>
          </div>
        </div>
      </div>
    </Dropdown>
  </li>
);

Message.propTypes = {
  item: PropTypes.object,
  id: PropTypes.number,
  removeMessage: PropTypes.func,
};

export default Message;
