import Form from "../../components/form/form";
import styles from './sign-in.module.scss';
import {useState} from "react";

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setEmail('');
    setPassword('');
  }

  const fields = [
    {
      value: email,
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      handler: (e) => setEmail(e.target.value)
    },
    {
      value: password,
      name: 'password',
      placeholder: 'Пароль',
      handler: (e) => setPassword(e.target.value),
      icon: 'ShowIcon',
      onIconClick: () => {}
    },
  ]

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Вход
      </h1>
      <Form fields={fields} handleSubmit={handleSubmit} submitTitle='Войти'/>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы - новый пользователь?
        <a href='#' className={`${styles.link} text text_type_main-default ml-2`}>
          Войти
        </a>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <a href='#' className={`${styles.link} text text_type_main-default ml-2`}>
          Зарегистрироваться
        </a>
      </p>

    </div>
  )
}