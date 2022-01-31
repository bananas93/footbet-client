import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export default function ChatHeader({ name, toggleShowChat }) {
  return (
    <div className={style.chatTitle}>
      <button type="button" className={style.closeButton} onClick={toggleShowChat}>
        <CloseOutlined />
      </button>
      <Avatar style={{ backgroundColor: '#28374d' }} icon={<UserOutlined />} />
      <span className={style.chatUserName}>{name}</span>
    </div>
  );
}

ChatHeader.propTypes = {
  toggleShowChat: PropTypes.func,
  name: PropTypes.string,
};
