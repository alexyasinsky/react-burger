import styles from './modal-overlay.module.scss';
import {JSX} from "react";

type TProps = {
  onClose: () => void
}
export default function ModalOverlay({ onClose } : TProps) : JSX.Element {
  return (<div className={styles.overlay} onClick={onClose}></div>);
}

