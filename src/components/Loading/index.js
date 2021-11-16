import { Spin } from 'antd';
import styles from './index.module.scss';

const Loading = () => (
  <div className={styles.loading}><Spin /></div>
);

export default Loading;
