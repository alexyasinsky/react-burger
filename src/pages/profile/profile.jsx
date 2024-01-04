import Form from "../../components/form/form";

import styles from './profile.module.scss';
import useInputNew from "../../hooks/useInputNew";
import {useDispatch, useSelector} from "react-redux";
import {editUser, getUser, logout} from "../../services/store/user/actions";
import {useEffect} from "react";
import {selectUser} from "../../services/store/user/reducers";


export default function Profile() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const user = useSelector(selectUser) || {};

  function editIconHandler() {
    dispatch(
      editUser({
      email: email.value,
      name: name.value,
      password: password.value
    })
    )
  }

  const name = useInputNew({
    name: 'name',
    placeholder: 'Имя',
    defaultValue: user.name,
    icon: 'EditIcon',
    onIconClick: editIconHandler
  });

  const email = useInputNew({
    name: 'email',
    placeholder: 'Логин',
    defaultValue: user.email,
    icon: 'EditIcon',
    onIconClick: editIconHandler
  });

  const password = useInputNew({
    name: 'password',
    placeholder: 'Пароль',
    defaultValue: user.password,
    icon: 'EditIcon',
    onIconClick: editIconHandler
  });
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