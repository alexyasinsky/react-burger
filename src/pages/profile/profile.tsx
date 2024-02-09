import styles from './profile.module.scss';
import {logout} from "../../services/store/user/actions";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {JSX} from "react";
import {useAppDispatch} from "../../services/store/types";


export default function Profile(): JSX.Element {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();



  const exitHandler = () => {
    // @ts-ignore
    dispatch(logout());
    navigate('/');
  }

  return (
      <div className={styles.wrapper}>
        <nav className={`${styles.menu} mr-20 text text_type_main-medium`}>
          <Link to=''>
            <p className={`${location.pathname === '/profile' ? 'text_color_primary' : 'text_color_inactive'}`}>
              Профиль
            </p>
          </Link>
          <Link to='orders'>
            <p className={`${location.pathname === '/profile/orders' ? 'text_color_primary' : 'text_color_inactive'}`}>
              История заказов
                </p>
          </Link>
          <button onClick={exitHandler} className={`${styles.exit} text text_type_main-medium text_color_inactive`}>Выход</button>
        </nav>
        <Outlet/>
      </div>
  )
}