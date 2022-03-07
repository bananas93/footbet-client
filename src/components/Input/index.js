import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';

const Input = ({
  type, value, error, id, name, placeholder, label, readOnly, onChange, onFocus, onBlur,
}) => (
  <>
    {label && (
      <label
        className={cn(styles.label, { [styles.labelReadOnly]: readOnly })}
        htmlFor={name}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      className={cn(styles.input, { [styles.inputError]: error, [styles.inputReadOnly]: readOnly })}
      readOnly={readOnly}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
    {error && (
      <div className={styles.error}>{error}</div>
    )}
  </>
);

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
