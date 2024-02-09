import Form from "../../components/form/form";
import styles from './forgot-password.module.scss';
import FormNavigation from "../../components/form/form-navigation/form-navigation";
import {makeRequest, BURGER_API} from "../../utils/api";
import {useLocation, useNavigate} from "react-router-dom";
import {JSX, SyntheticEvent} from "react";
import {useInput} from "../../hooks/useInput";
import FormInput from "../../components/form/form-input/form-input";

type TResetPasswordRequestBody = {
  email: string;
}

type TResetPasswordRequestResponse = {
  success: string;
  message: string;
}
export default function ForgotPassword(): JSX.Element {

  const location = useLocation();

  const email = useInput({
    name: 'email'
  })

  async function resetPassword(body: TResetPasswordRequestBody) {
    return await makeRequest<TResetPasswordRequestResponse>(`${BURGER_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({...body})
    });
  }

  const navigate = useNavigate();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    resetPassword({
      email: email.value
    }).then(() => {
      return navigate('/reset-password', {state: {from: location.pathname}})
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
        <FormInput
          input={email}
          placeholder='Укажите e-mail'
        />
      </Form>
      <FormNavigation
        links={formLinks}
      />
    </div>
  )
}