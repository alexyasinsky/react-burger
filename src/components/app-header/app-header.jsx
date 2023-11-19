import styles from './app-header.module.scss';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {

  return (
    <header>
      <nav>
        <div className={styles.link}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={styles.link}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
        </div>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <div className={styles.link}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </div>

      </nav>

    </header>
  )
}