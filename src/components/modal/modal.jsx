import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Modal({ children, title, isVisible, onClose }) {
  const modalRoot = document.getElementById('react-modals');

  return createPortal(
   <div className={styles.wrapper} style={{visibility: isVisible}}>
      <div className={`${styles.modal} p-10`}>
        <header className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" onClick={onClose}/>
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </div>
  ,
    modalRoot
  );
}
