import {
  Input, Form, Button, Card, Divider, notification,
} from 'antd';
import { useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../api/auth';

export default function Profile() {
  const notificationError = (error) => {
    notification.error({
      message: 'Помилка',
      description: error,
    });
  };
  const notificationSuccess = (message) => {
    notification.success({
      message: 'Успіх',
      description: message,
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    getUserDetails().then((res) => {
      if (res) {
        form.setFieldsValue(res);
      } else {
        notificationError('Помилка серверу...');
      }
    });
  }, []);
  const changeProfile = (values) => {
    updateUserDetails(values).then((res) => {
      if (res) {
        form.setFieldsValue(res);
        notificationSuccess('Профіль успішно оновлено');
      } else {
        notificationError('Помилка серверу...');
      }
    });
  };
  const onFinish = (values) => {
    changeProfile(values);
  };
  return (
    <div className="site-form">
      <h1 className="site-title">Мій профіль</h1>
      <Card>
        <Form
          form={form}
          className="sign-in-form"
          onFinish={onFinish}
          layout="vertical"
          name="signin-form"
          requiredMark={false}
          colon={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введіть ваш email' }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Ім'я"
            name="name"
            rules={[{ required: true, message: 'Введіть ваше ім\'я' }]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item
            label="Новий пароль"
            name="password1"
            rules={[{ message: 'Введіть ваш пароль' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Повторіть новий пароль"
            name="password2"
            rules={[{ message: 'Введіть ваш пароль' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Змінити
            </Button>
          </Form.Item>
        </Form>
        {/* <a href="http://localhost:3000/api/auth/google">Приєднати Google Account</a> */}
      </Card>
    </div>
  );
}
