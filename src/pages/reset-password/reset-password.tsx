import Form from "../../components/form/form";
import styles from './reset-password.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import {useInput, usePasswordInput} from "../../hooks/useInputs";
import {makeRequest, burgerApi} from "../../utils/api";
import { Navigate, useLocation} from "react-router-dom";
import {JSX, SyntheticEvent} from "react";

type TSetNewPasswordRequestBody = {
  password: string;
  token: string;
}
export default function ResetPassword(): JSX.Element {

  const password = usePasswordInput({
    placeholder: 'Пароль',
  });

  const code = useInput({
    name: 'code',
    placeholder: 'Введите код из письма'
  });

  const location = useLocation();

  if (location.state?.from !== '/forgot-password') {
    return (<Navigate to='/'/>)
  }

  async function setNewPassword (body: TSetNewPasswordRequestBody) {
    return await makeRequest(`${burgerApi}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({...body})
    });
  }
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setNewPassword({
      password: password.value,
      token: code.value
    }).then(() => {
      return (<Navigate to='/'/>)
    })
  }

  const formLinks = [
    {
      href: '/login',
      question: 'Вспомнили пароль?',
      title: 'Войти'
    }
  ]

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h1>
      <Form
        inputs={[password, code]}
        handleSubmit={handleSubmit}
        submitTitle='Сохранить'
      />
      <FormNavigation
        links={formLinks}
      />

    </div>
  )
}