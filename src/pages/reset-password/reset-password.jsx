import Form from "../../components/form/form";
import styles from './reset-password.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";

export default function ResetPassword() {

  const password = useInputNew('password', 'Введите новый пароль', 'ShowIcon');
  const code = useInputNew('code', 'Введите код из письма');

  function handleSubmit(e) {
    e.preventDefault();
    password.setValue('');
    code.setValue('');
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