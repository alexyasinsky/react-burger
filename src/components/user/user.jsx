import Form from "../form/form";
import styles from "./user.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {editUser, getUser} from "../../services/store/user/actions";
import {selectUser} from "../../services/store/user/reducers";
import useInputNew from "../../hooks/useInputNew";


export default function User () {

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


  return (
    <>
      <Form
        inputs={[name, email, password]}
      />
      <p className={`${styles.description} text text_type_main-small mt-4`}>
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </>

  )
}