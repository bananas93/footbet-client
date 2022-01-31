import {
  Input, Form, Button, Divider,
} from 'antd';
import { useContext, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../../api/auth';
import { TitleContext } from '../../utils/contexts';
import styles from './index.module.scss';
import Card from '../../components/Card';
import { notificationWrapper } from '../../helpers/notification';
import { logout } from '../../helpers/authHelper';

function ProfilePage() {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Профіль');
  }, [setTitle]);

  const [form] = Form.useForm();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await getUserDetails();
        if (res.status && res.status === 200) {
          form.setFieldsValue({
            name: res.data.name,
            email: res.data.email,
          });
        }
      } catch (error) {
        notificationWrapper(true, error.message);
      }
    };
    loadUserData();
  }, []);

  const changeProfile = async (values) => {
    if (values.password !== values.password2) {
      notificationWrapper(true, 'Пароль не співпадають');
      return;
    }
    try {
      const res = await updateUserDetails(values);
      if (res.status && res.status === 201) {
        form.setFieldsValue({
          name: res.data.name,
          email: res.data.email,
        });
        notificationWrapper(false, 'Профіль успішно оновлено');
      }
    } catch (error) {
      notificationWrapper(true, error.message);
    }
  };
  const onFinish = (values) => {
    changeProfile(values);
  };

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Card
          title="Оновити профіль"
          action={
            <button className={styles.exit} type="button" onClick={logout}>Вийти</button>
          }
        >
          <Form
            form={form}
            className="sign-in-form"
            onFinish={onFinish}
            layout="vertical"
            name="signin-form"
            requiredMark={false}
            colon={false}
            autoComplete="chrome-off"
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
              name="password"
              hasFeedback
              rules={[{ message: 'Введіть ваш новий пароль' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Підтвердіть новий пароль"
              name="password2"
              dependencies={['password']}
              hasFeedback
              rules={[
                { message: 'Підтвердіть ваш новий пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Змінити
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
