import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

export default function Modal({ children, title, isVisible, onClose }) {
  const modalRoot = document.getElementById('react-modals');

  return createPortal(
   <div className={styles.wrapper} style={{visibility: isVisible}}>
      <div className={styles.modal}>
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        {children}
        модалка
      </div>
      <ModalOverlay onClose={onClose}/>
    </div>
  ,
    modalRoot
  );
}
