import Form from "../../components/form/form";
import {useState} from "react";

import styles from './profile.module.scss';


export default function Profile() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fields = [
    {
      value: name,
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      handler: (e) => setName(e.target.value),
      icon: 'EditIcon',
      onIconClick: () => {}
    },
    {
      value: email,
      name: 'email',
      type: 'email',
      placeholder: 'Логин',
      handler: (e) => setEmail(e.target.value),
      icon: 'EditIcon',
      onIconClick: () => {}
    },
    {
      value: password,
      name: 'password',
      placeholder: 'Пароль',
      handler: (e) => setPassword(e.target.value),
      icon: 'EditIcon',
      onIconClick: () => {}
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.menu} mr-20`}>
        <nav>
          <a href="#" className="text text_type_main-medium text_color_primary">Профиль</a>
          <a href="#" className="text text_type_main-medium text_color_inactive">История заказов</a>
          <a href="#" className="text text_type_main-medium text_color_inactive">Выход</a>
        </nav>
        <p className="text text_type_main-small mt-20">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <Form fields={fields}/>
    </div>
  )
}