import styles from './app-header.module.scss';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderLink from "../app-header-link/app-header-link";
import {Link} from "react-router-dom";

export default function AppHeader() {

  return (
    <header className={styles.wrapper}>
      <nav className={styles.navigation}>
        <AppHeaderLink
          href='/'
          icon={<BurgerIcon type=''/>}
          title='Конструктор'
        />
        <AppHeaderLink
          href='/orders'
          icon={<ListIcon type=''/>}
          title='Лента заказов'
        />
        <Link to='/' className={`${styles.logo} pb-2 pt-2`}>
          <Logo/>
        </Link>
        <AppHeaderLink
          href='/profile'
          icon={<ProfileIcon type=''/>}
          title='Личный кабинет'
        />
      </nav>
    </header>
  )
}