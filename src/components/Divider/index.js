import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Divider = ({ children }) => (
  <div className={styles.divider}>
    <span>{children}</span>
  </div>
);

Divider.propTypes = {
  children: PropTypes.any,
};

export default Divider;
