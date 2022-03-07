import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { useContext, useEffect } from 'react';
import SignIn from '../../blocks/Login/SignIn';
import SignUp from '../../blocks/Login/SignUp';
import { TitleContext } from '../../utils/contexts';
import styles from './index.module.scss';

const LoginPage = () => {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle('Вхід/Реєстрація');
  }, [setTitle]);

  return (
    <div className={styles.login}>
      <Tabs>
        <TabList>
          <Tab>Вхід</Tab>
          <Tab>Реєстрація</Tab>
        </TabList>
        <TabPanel>
          <SignIn />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default LoginPage;
