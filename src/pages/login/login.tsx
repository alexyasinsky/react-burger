import Form from "../../components/form/form";
import styles from './login.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import {useDispatch} from "react-redux";
import {login} from "../../services/store/user/actions";
import {useInput, usePasswordInput} from "../../hooks/useInputs";
import {JSX, SyntheticEvent} from "react";

export default function Login(): JSX.Element {

  const email = useInput({
    name: 'email',
    placeholder: 'E-mail',
    type: 'email'
  });

  const password = usePasswordInput({
    placeholder: 'Пароль',
  });

  const formLinks = [
    {
      href: '/register',
      question: 'Вы - новый пользователь?',
      title: 'Зарегистрироваться'
    },
    {
      href: '/forgot-password',
      question: 'Забыли пароль?',
      title: 'Восстановить пароль'
    }
  ]

  const dispatch = useDispatch();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    // @ts-ignore
    dispatch(login({
        email: email.value,
        password: password.value
      }
    ))
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