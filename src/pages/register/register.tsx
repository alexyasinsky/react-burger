import Form from "../../components/form/form";
import styles from './register.module.scss';
import FormNavigation from "../../components/form/form-navigation/form-navigation";
import {useDispatch} from "react-redux";
import {register} from "../../services/store/user/actions";
import {JSX, SyntheticEvent} from "react";
import FormInput from "../../components/form/form-input/form-input";
import {useInput} from "../../hooks/useInput";

export default function Register(): JSX.Element {

  const name = useInput({
    name: 'name'
  })


  const email = useInput({
    name: 'email'
  })

  const password = useInput({
    name: 'password'
  })

  const dispatch = useDispatch();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    // @ts-ignore
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
          handleSubmit={handleSubmit}
          submitTitle='Войти'
      >
        <FormInput
            input={name}
            placeholder='Имя'
        />
        <FormInput
            input={email}
            placeholder='E-mail'
        />
        <FormInput input={password}
                   placeholder='Пароль'
                   type='password'
                   icon='ShowIcon'
        />
      </Form>
      <FormNavigation
        links={formLinks}
      />
    </div>
  )
}