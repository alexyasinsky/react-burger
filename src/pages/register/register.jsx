import Form from "../../components/form/form";
import styles from './register.module.scss';
import FormNavigation from "../../components/form-navigation/form-navigation";
import {useInput, usePasswordInput} from "../../hooks/useInputs";
import {useDispatch} from "react-redux";
import {register} from "../../services/store/user/actions";

export default function Register() {

  const name = useInput({
    name: 'name',
    placeholder: 'Имя'
  });

  const email = useInput({
    name: 'email',
    placeholder: 'E-mail',
    type: 'email',
  });

  const password = usePasswordInput({
    placeholder: 'Пароль',
  });

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({
      email: email.value,
      password: password.value,
      name: name.value
    }))
  }

  const formLinks = [
    {
      href: '/login',
      question: 'Уже зарегистрированы?',
      title: 'Войти'
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