import styles from './modal-overlay.module.scss';

export default function ModalOverlay({ onClose }) {
  return <div className={styles.overlay} onClick={onClose}></div>;
}
