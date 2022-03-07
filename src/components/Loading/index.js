import styles from './index.module.scss';

const Loading = () => (
  <div className={styles.loadingWrapper}>
    <div className={styles.loadingIcon} />
    <div className={styles.loadingText}>Завантаження...</div>
  </div>
);

export default Loading;
