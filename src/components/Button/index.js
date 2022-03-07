/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const Button = ({
  onClick,
  id,
  size,
  type,
  form,
  variant,
  isLoading,
  isDisabled,
  style,
  children,
}) => {
  const btnClass = cn({
    [styles.btn]: true,
    [`btn${size}`]: size,
    [styles.btnPrimary]: variant === 'primary',
    [styles.btnSecondary]: variant === 'secondary',
    [styles.btnLink]: variant === 'link',
    [styles.btnDisabled]: isDisabled || isLoading,
  });

  return (
    <button
      id={id}
      form={form}
      type={type || 'button'}
      onClick={onClick}
      style={style}
      tabIndex={isDisabled || isLoading ? '-1' : ''}
      className={btnClass}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  id: PropTypes.string,
  form: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'link']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.oneOf(['32', '40', '48']),
};

export default Button;
