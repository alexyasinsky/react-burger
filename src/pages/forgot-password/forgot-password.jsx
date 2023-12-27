import Form from "../../components/form/form";
import styles from './forgot-password.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";

export default function ForgotPassword() {

  const email = useInputNew('email', 'Укажите e-mail');

  function handleSubmit(e) {
    e.preventDefault();
    email.setValue('');
  }

  const formLinks = [
    {
      href: '/login',
      question: 'Вспомнили пароль?'
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