import ModalOverlay from './modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {JSX, ReactNode, useEffect} from 'react';

type TProps = {
  children: ReactNode,
  onClose: () => void
}
export default function Modal({ children, onClose } : TProps) : JSX.Element {

  const modalRoot = document.getElementById('react-modals')!;
  function escapeHandler(event: KeyboardEvent) {
    return event.key === 'Escape' && onClose();
  }
  useEffect(()=> {
    document.addEventListener('keydown', escapeHandler);
    return (()=>{
      document.removeEventListener('keydown', escapeHandler);
    })
  })

  return createPortal(
   (<div className={styles.wrapper} data-test-modal='comp'>
     <div className={`${styles.modal} p-10`}>
       <div className={styles.close}>
         <div data-test-modal='close'>
           <CloseIcon type="primary" onClick={onClose}/>
         </div>

       </div>
       {children}
     </div>
     <ModalOverlay onClose={onClose}/>
   </div>)
    ,
    modalRoot
  );
}
