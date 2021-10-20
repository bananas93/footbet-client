import { Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/contexts';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

const { TabPane } = Tabs;

export default function Login() {
  const { authorized } = useContext(AuthContext);
  if (authorized) {
    return <Redirect to="/" />;
  }
  return (
    <div className="site-form">
      <h1 className="site-title">Вхід/Реєстрація</h1>
      <Tabs defaultActiveKey="1">
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
