import {
  Input, Form, Checkbox, notification, Modal, Button, Card, Divider,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/auth';

export default function SignIn() {
  const notificationError = (error) => {
    notification.error({
      message: 'Помилка',
      description: error,
    });
  };
  const signIn = (values) => {
    login(values).then((res) => {
      if (res) {
        if (res.status === 200) {
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
    signIn(values);
  };
  return (
    <Card>
      <strong>Увійти за допомогою</strong>
      {' '}
      <br />
      <a className="sign-google" href="https://footbet.herokuapp.com/api/auth/google"><img width="30" src="/google.svg" alt="google" /></a>
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
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введіть ваш пароль' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запам&apos;ятати?</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Увійти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
