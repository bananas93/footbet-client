import { Tabs } from 'antd';
import { useContext } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { TitleContext } from '../../utils/contexts';

const { TabPane } = Tabs;

export default function LoginPage() {
  const { setTitle } = useContext(TitleContext);
  setTitle('Вхід/Реєстрація');

  return (
    <div className="site-form">
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
