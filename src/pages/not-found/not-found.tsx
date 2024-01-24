import styles from './not-found.module.scss'
import {JSX} from "react";

export default function NotFound() : JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Упс, такой страницы не существует =(</h1>
    </div>
  )
}