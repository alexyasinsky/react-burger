import Form from "../../components/form/form";
import styles from './reset-password.module.scss';
import {useState} from "react";

export default function ResetPassword() {

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setPassword('');
    setCode('');
  }

  const fields = [
    {
      value: password,
      name: 'password',
      placeholder: 'Введите новый пароль',
      handler: (e) => setPassword(e.target.value),
      icon: 'ShowIcon',
      onIconClick: () => {}
    },
    {
      value: code,
      name: 'code',
      type: 'text',
      placeholder: 'Введите код из письма',
      handler: (e) => setCode(e.target.value)
    },
  ]

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h1>
      <Form fields={fields} handleSubmit={handleSubmit} submitTitle='Сохранить'/>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <a href='#' className={`${styles.link} text text_type_main-default ml-2`}>
          Войти
        </a>
      </p>
    </div>
  )
}