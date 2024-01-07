import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Упс, такой страницы не существует =(</h1>
    </div>
  )
}