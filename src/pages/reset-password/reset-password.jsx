import Form from "../../components/form/form";
import styles from './reset-password.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";
import {makeRequest, url} from "../../utils/api";
import {Navigate, useNavigate} from "react-router-dom";

export default function ResetPassword() {

  const password = useInputNew({
    name: 'password',
    placeholder: 'Пароль',
    icon: 'ShowIcon'
  });

  const code = useInputNew({
    name: 'code',
    placeholder: 'Введите код из письма'
  });

  const navigate = useNavigate();

  if (localStorage.getItem('isPasswordReset') === true) {
    return (<Navigate to='/'/>)
  }

  async function setNewPassword (body) {
    return await makeRequest(`${url}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({...body})
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setNewPassword({
      password: password.value,
      token: code.value
    }).then(() => {
      localStorage.removeItem('isPasswordReset');
      navigate('/');
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