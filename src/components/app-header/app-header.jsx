import styles from './app-header.module.scss';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {

  return (
    <header className={styles.wrapper}>
      <nav className={styles.navigation}>
        <div className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <BurgerIcon type="primary"/>
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type="secondary"/>
          <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
        </div>
        <div className={`${styles.logo} pb-2 pt-2`}>
          <Logo/>
        </div>
        <div className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon type="secondary"/>
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </div>
      </nav>
    </header>
  )
}