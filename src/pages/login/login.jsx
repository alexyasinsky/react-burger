import Form from "../../components/form/form";
import styles from './login.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import useInputNew from "../../hooks/useInputNew";
import {useDispatch} from "react-redux";
import {login} from "../../services/store/user/actions";

export default function Login() {

  const email = useInputNew({
    name: 'email',
    placeholder: 'E-mail'
  });

  const password = useInputNew({
    name: 'password',
    placeholder: 'Пароль',
    icon: 'ShowIcon'
  });

  const formLinks = [
    {
      href: '/login',
      question: 'Вы - новый пользователь?',
      title: 'Войти'
    },
    {
      href: '/forgot-password',
      question: 'Забыли пароль?',
      title: 'Восстановить пароль'
    }
  ]

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
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