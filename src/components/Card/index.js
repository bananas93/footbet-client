import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const Card = ({ title, action, children }) => (
  <div className={styles.card}>
    {title && (
      <div className={styles.cardTitle}>
        <span>{title}</span>
        {action && (
          <div className={styles.cardAction}>{action}</div>
        )}
      </div>
    )}
    <div className={cn(styles.cardBody, { [styles.cardBodyWithoutTitle]: !title })}>
      {children}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node,
};

export default Card;
