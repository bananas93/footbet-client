import { Tabs } from 'antd';
import { useContext, useEffect } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { TitleContext } from '../../utils/contexts';
import styles from './index.module.scss';

const { TabPane } = Tabs;

export default function LoginPage() {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Вхід/Реєстрація');
  }, [setTitle]);

  return (
    <div className={styles.login}>
      <Tabs centered size="large" defaultActiveKey="1">
        <TabPane tab="Вхід" key="1">
          <SignIn />
        </TabPane>
        <TabPane tab="Реєстрація" key="2">
          <SignUp />
        </TabPane>
      </Tabs>
    </div>
  );
}
