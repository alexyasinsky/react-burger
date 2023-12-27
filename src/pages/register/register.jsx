import Form from "../../components/form/form";
import styles from './register.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";

export default function Register() {

  const name = useInputNew('name', 'Имя');
  const email = useInputNew('email', 'E-mail');
  const password = useInputNew('password', 'Пароль', 'ShowIcon');

  function handleSubmit(e) {
    e.preventDefault();
    name.setValue('');
    email.setValue('');
    password.setValue('');
  }

  const formLinks = [
    {
      href: '/login',
      question: 'Уже зарегистрированы?'
    },
  ]


  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">
        Регистрация
      </h1>
      <Form
        inputs={[name, email, password]}
        handleSubmit={handleSubmit}
        submitTitle='Зарегистрироваться'
      />
      <FormNavigation
        links={formLinks}
      />
    </div>
  )
}