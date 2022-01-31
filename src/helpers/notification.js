import { notification } from 'antd';

export const notificationWrapper = (error, message) => {
  if (error) {
    return notification.error({
      message: 'Помилка',
      description: message,
    });
  }
  return notification.success({
    message: 'Успіх',
    description: message,
  });
};
