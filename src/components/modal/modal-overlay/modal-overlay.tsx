import styles from './modal-overlay.module.scss';
import {JSX} from "react";

type TModalOverlayProps = {
  onClose: () => void
}
export default function ModalOverlay({ onClose } : TModalOverlayProps) : JSX.Element {
  return (<div className={styles.overlay} onClick={onClose}></div>);
}

