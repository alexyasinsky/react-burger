import Form from "../../components/form/form";
import styles from './register.module.scss';
import {useState} from "react";

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
  }

  const fields = [
    {
      value: name,
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      handler: (e) => setName(e.target.value)
    },
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
        Регистрация
      </h1>
      <Form fields={fields} handleSubmit={handleSubmit} submitTitle='Зарегистрироваться'/>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <a href='#' className={`${styles.link} text text_type_main-default ml-2`}>
          Войти
        </a>
      </p>
    </div>
  )
}