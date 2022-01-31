import PropTypes from 'prop-types';
import { Menu } from 'antd';

const MessageMenu = ({ message, removeMessage }) => (
  <Menu>
    <Menu.Item onClick={() => removeMessage(message)} key="1">Видалити</Menu.Item>
  </Menu>
);

MessageMenu.propTypes = {
  message: PropTypes.object,
  removeMessage: PropTypes.func,
};

export default MessageMenu;
