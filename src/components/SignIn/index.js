import {
  Input, Form, Checkbox, Button, Divider,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Card from '../Card';
import { login } from '../../api/auth';
import { notificationWrapper } from '../../helpers/notification';
import { setCookie } from '../../helpers/authHelper';

export default function SignIn() {
  const signIn = async (values) => {
    try {
      const res = await login(values);
      if (res.status && res.status === 200) {
        const { token } = res.data;
        setCookie('JWToken', token, {
          expires: new Date(Date.now() + 10 * 604800000),
          path: '/',
        });
        window.location.href = 'https://footbet.pp.ua/profile';
      }
    } catch (error) {
      const err = error.message || error.response.data;
      notificationWrapper(true, err);
    }
  };

  const onFinish = (values) => {
    signIn(values);
  };

  return (
    <div style={{ margin: '10px' }}>
      <Card title="Вхід">
        <strong>Увійти за допомогою</strong>
        {' '}
        <br />
        <a className="sign-google" href="https://footbet.pp.ua/api/auth/google"><img width="30" src="/google.svg" alt="google" /></a>
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
    </div>
  );
}
