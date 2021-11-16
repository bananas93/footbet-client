import {
  Input, Form, Button, Divider,
} from 'antd';
import { useContext, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../../api/auth';
import { TitleContext } from '../../utils/contexts';
import styles from './index.module.scss';
import Card from '../../components/Card';
import { notificationWrapper } from '../../helpers/notification';

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
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        notificationWrapper(true, error.message);
      }
    };
    loadUserData();
  }, []);
  const changeProfile = async (values) => {
    try {
      const res = await updateUserDetails(values);
      if (res.status && res.status === 201) {
        form.setFieldsValue(res.data);
        notificationWrapper(false, 'Профіль успішно оновлено');
      }
      form.setFieldsValue(res);
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
        <Card title="Оновити профіль">
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
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
