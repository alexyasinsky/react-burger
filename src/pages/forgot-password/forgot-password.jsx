import Form from "../../components/form/form";
import styles from './forgot-password.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";
import {makeRequest, url} from "../../utils/api";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {

  const email = useInputNew({
    name: 'email',
    placeholder: 'Укажите e-mail'
  });
  async function resetPassword (body) {
    return await makeRequest(`${url}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({...body})
    });
  }
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    resetPassword({
      email: email.value
    }).then(()=>{
      localStorage.setItem('isPasswordReset', 'true');
      navigate('/reset-password')
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
        inputs={[email]}
        handleSubmit={handleSubmit}
        submitTitle='Восстановить'
      />
      <FormNavigation
        links={formLinks}
      />
    </div>
  )
}