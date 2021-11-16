import {
  Input, Form, notification, Modal, Button, Divider,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Card from '../Card';
import { register } from '../../api/auth';

export default function SignUp() {
  const notificationError = (error) => {
    notification.error({
      message: 'Помилка',
      description: error,
    });
  };
  const signUp = (values) => {
    register(values).then((res) => {
      if (res) {
        if (res.status === 201) {
          window.location.reload();
        } else {
          Modal.error({
            title: 'Помилка',
            content: res.data.error,
            onOk() {},
          });
        }
      } else {
        notificationError('Помилка серверу...');
      }
    });
  };
  const onFinish = (values) => {
    signUp(values);
  };
  return (
    <div style={{ margin: '10px' }}>
      <Card title="Реєстрація">
        <strong>Зареєструватися за допомогою</strong>
        {' '}
        <br />
        <a className="sign-google" href="https://footbet.site/api/auth/google"><img width="30" src="/google.svg" alt="google" /></a>
        <Divider />
        <Form
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
            <Input prefix={<MailOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            label="Ім'я"
            name="name"
            rules={[{ required: true, message: 'Введіть вашe ім\'я' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введіть ваш пароль' }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            label="Повторіть пароль"
            name="password"
            rules={[{ required: true, message: 'Повторіть ваш пароль' }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зареєструватися
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
