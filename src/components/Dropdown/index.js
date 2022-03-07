import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { ArrowDown } from '../../assets/img';
import styles from './index.module.scss';
import useOutsideClick from '../../helpers/useOutsideClick';

const Dropdown = ({ onClick, options, children }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const dropdownRef = useRef();

  useOutsideClick(dropdownRef, () => setOpen(false));

  const toggleOpen = () => {
    setOpen(!open);
  };
  const setItem = (option, index) => {
    setSelected(option);
    setOpen(false);
    onClick(index);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button type="submit" className={cn(styles.btn, { [styles.btnOpen]: open })} onClick={toggleOpen}>
        <span>{selected || children}</span>
        <ArrowDown />
      </button>
      {open && (
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <button type="submit" className={styles.btn} onClick={() => setItem('', 0)}>Обрати тур</button>
          </li>
          {options.map((option, index) => (
            <li key={option} className={styles.listItem}>
              <button type="submit" className={styles.btn} onClick={() => setItem(option, index + 1)}>{option}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
Dropdown.propTypes = {
  options: PropTypes.array,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Dropdown;
