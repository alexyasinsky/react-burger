import Form from "../../components/form/form";

import styles from './profile.module.scss';
import useInputNew from "../../hooks/useInputNew";
import {useDispatch} from "react-redux";
import {logout} from "../../services/store/user/actions";


export default function Profile() {

  const name = useInputNew('name', 'Имя', 'EditIcon');
  const email = useInputNew('email', 'Логин', 'EditIcon');
  const password = useInputNew('password', 'Пароль', 'EditIcon');

  const dispatch = useDispatch();
  const exitHandler = () => {
    dispatch(logout());
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.menu} mr-20`}>
        <nav>
          <a href="#" className="text text_type_main-medium text_color_primary">Профиль</a>
          <a href="#" className="text text_type_main-medium text_color_inactive">История заказов</a>
          <p onClick={exitHandler} className="text text_type_main-medium text_color_inactive">Выход</p>
        </nav>
        <p className="text text_type_main-small mt-20">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <Form
        inputs={[name, email, password]}
      />
    </div>
  )
}