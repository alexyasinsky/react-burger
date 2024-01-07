import styles from './profile.module.scss';
import {useDispatch} from "react-redux";
import {logout} from "../../services/store/user/actions";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";


export default function Profile() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();



  const exitHandler = () => {
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
          <p onClick={exitHandler} className="text text_type_main-medium text_color_inactive">Выход</p>
        </nav>
        <Outlet/>
      </div>
  )
}