import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const Card = ({
  title, action, style, titleStyle, noMobileShadow, children,
}) => (
  <div className={cn(styles.card, { [styles.noMobileShadow]: noMobileShadow })} style={style}>
    {title && (
      <div className={styles.cardTitle} style={titleStyle}>
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
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  noMobileShadow: PropTypes.bool,
  action: PropTypes.node,
};

export default Card;
