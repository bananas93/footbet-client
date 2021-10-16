import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export default function ChatHeader({ toggleShowChat }) {
  return (
    <div className={style.chatTitle}>
      <button type="button" className={style.closeButton} onClick={toggleShowChat}>
        <CloseOutlined />
      </button>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      <span className={style.chatUserName}>Давид</span>
    </div>
  );
}

ChatHeader.propTypes = {
  toggleShowChat: PropTypes.func,
};
