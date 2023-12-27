import Form from "../../components/form/form";
import styles from './login.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";

export default function Login() {

  const email = useInputNew('email', 'E-mail');
  const password = useInputNew('password', 'Пароль', 'ShowIcon');

  const formLinks = [
    {
      href: '/login',
      question: 'Вы - новый пользователь?'
    },
    {
      href: '/register',
      question: 'Забыли пароль?'
    }
  ]
  function handleSubmit(e) {
    e.preventDefault();
    email.setValue('');
    password.setValue('');
  }

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Вход
      </h1>
      <Form
        inputs={[email, password]}
        handleSubmit={handleSubmit}
        submitTitle='Войти'
      />
      <FormNavigation
        links={formLinks}
        />
    </div>
  )
}