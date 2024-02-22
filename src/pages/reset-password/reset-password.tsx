import Form from "../../components/form/form";
import styles from './reset-password.module.scss';
import FormNavigation from "../../components/form/form-navigation/form-navigation";
import {makeRequest} from "../../utils/api";
import { Navigate, useLocation} from "react-router-dom";
import {JSX, SyntheticEvent} from "react";
import FormInput from "../../components/form/form-input/form-input";
import {useInput} from "../../hooks/useInput";
import {BURGER_API} from "../../utils/constants";

type TSetNewPasswordRequestBody = {
  password: string;
  token: string;
}
export default function ResetPassword(): JSX.Element {

  const code = useInput({
    name: 'code'
  })

  const password = useInput({
    name: 'password'
  })

  const location = useLocation();

  if (location.state?.from !== '/forgot-password') {
    return (<Navigate to='/'/>)
  }

  async function setNewPassword (body: TSetNewPasswordRequestBody) {
    return await makeRequest(`${BURGER_API}/password-reset/reset`, {
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
          handleSubmit={handleSubmit}
          submitTitle='Войти'
      >
        <FormInput input={password}
                   placeholder='Пароль'
                   type='password'
                   icon='ShowIcon'
        />
        <FormInput
            input={code}
            placeholder='Введите код из письма'
        />
      </Form>
      <FormNavigation
        links={formLinks}
      />

    </div>
  )
}