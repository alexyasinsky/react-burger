import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ children, title, onClose }) {
  const modalRoot = document.getElementById('react-modals');

  function escapeHandler(event) {
    return event.key === 'Escape' && onClose();
  }
  useEffect(()=> {
    document.addEventListener('keydown', escapeHandler);
    return (()=>{
      document.removeEventListener('keydown', escapeHandler);
    })
  })

  return createPortal(
   (<div className={styles.wrapper}>
      <div className={`${styles.modal} p-10`}>
        <header className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" onClick={onClose}/>
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </div>)
  ,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}
