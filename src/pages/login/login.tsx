import Form from "../../components/form/form";
import styles from './login.module.scss';
import FormNavigation from "../../components/form/form-navigation/form-navigation";
import {login} from "../../services/store/user/actions";
import {JSX, SyntheticEvent} from "react";
import {useInput} from "../../hooks/useInput";
import FormInput from "../../components/form/form-input/form-input";
import {useAppDispatch} from "../../services/store/hooks";

export default function Login(): JSX.Element {

    const email = useInput({
        name: 'email'
    })

    const password = useInput({
        name: 'password'
    })

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

    const dispatch = useAppDispatch();

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
                handleSubmit={handleSubmit}
                submitTitle='Войти'
            >
                <FormInput
                    input={email}
                    placeholder='E-mail'
                    testId='email-input'
                />
                <FormInput input={password}
                           placeholder='Пароль'
                           type='password'
                           icon='ShowIcon'
                           testId='password-input'
                />
            </Form>
            <FormNavigation
                links={formLinks}
            />
        </div>
    )
}