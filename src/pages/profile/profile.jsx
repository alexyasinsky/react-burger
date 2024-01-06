import styles from './profile.module.scss';
import {useDispatch} from "react-redux";
import {logout} from "../../services/store/user/actions";
import { NavLink, Outlet, useNavigate} from "react-router-dom";


export default function Profile() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const exitHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
      <div className={styles.wrapper}>
        <nav className={`${styles.menu} mr-20 text text_type_main-medium`}>
          <NavLink to='user'>
            {({isActive}) => {
              return (
                <p className={`${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
                  Профиль
                </p>
              )
            }}
            </NavLink>
          <NavLink to='orders'>
            {({isActive}) => {
              return (
                <p className={`${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
                  История заказов
                </p>
              )
            }}
          </NavLink>
          <p onClick={exitHandler} className="text text_type_main-medium text_color_inactive">Выход</p>
        </nav>
        <Outlet/>
      </div>
  )
}