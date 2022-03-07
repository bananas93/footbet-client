import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import { CloseIcon } from '../../assets/img';

const Modal = ({
  children, isOpen, onRequestClose, title, size, footer,
}) => (
  <ReactModal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={size === 'large' ? { content: { width: '100%', maxWidth: '750px' } } : {}}
  >
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <CloseIcon className={styles.modalHeaderClose} onClick={onRequestClose} />
        <span>{title}</span>
      </div>
      <div className={styles.modalContent}>
        {children}
      </div>

      <div className={styles.modalFooter}>
        {footer}
      </div>

    </div>
  </ReactModal>
);

Modal.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.element,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
};

export default Modal;
