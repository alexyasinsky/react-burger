import Form from "../../components/form/form";
import styles from './forgot-password.module.scss';
import {useState} from "react";

export default function ForgotPassword() {

  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setEmail('');
  }

  const fields = [
    {
      value: email,
      name: 'email',
      type: 'email',
      placeholder: 'Укажите e-mail',
      handler: (e) => setEmail(e.target.value)
    },
  ]

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h1>
      <Form fields={fields} handleSubmit={handleSubmit} submitTitle='Восстановить'/>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <a href='#' className={`${styles.link} text text_type_main-default ml-2`}>
          Войти
        </a>
      </p>
    </div>
  )
}