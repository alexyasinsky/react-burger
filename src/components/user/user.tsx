import styles from "./user.module.scss";
import {JSX, SyntheticEvent, useEffect, useState} from "react";
import {editUser, getUser} from "../../services/store/user/actions";
import {selectUser} from "../../services/store/user/reducers";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {TMonoTypeObject, TUser} from "../../utils/types";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import UserFormInput from "./user-form-input/user-form-input";
import {useInput} from "../../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";


type TUserIcons = {
  [name: string] : keyof TICons | undefined
}

export default function User(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const user: TUser | null = useAppSelector(selectUser);

  const name = useInput({
    name: 'name',
    defaultValue: user ? user['name']: ''
  })

  const email = useInput({
    name: 'email',
    defaultValue: user ? user['email']: ''
  })

  const password = useInput({
    name: 'password',
  })

  const [isEditButtonsShown, setIsEditButtonsShown] = useState<boolean>(false);

  const [icons, setIcons] = useState<TUserIcons>({
    name: 'EditIcon',
    email: 'EditIcon',
    password: 'EditIcon'
  })

  function startEditingPersonalData(event: SyntheticEvent) {
    setIsEditButtonsShown(true);
    const target = event.target as HTMLInputElement;
    setIcons({
      ...icons,
      [target.name]: 'CloseIcon'
    })
  }

  function cancelEditingPersonalData (){
    name.setValue(user ? user['name'] : '');
    email.setValue(user ? user['email'] : '');
    password.setValue('');
    finishEditingPersonalData();
  }

  function finishEditingPersonalData() {
    setIsEditButtonsShown(false);
    setIcons({
      name: 'EditIcon',
      email: 'EditIcon',
      password: 'EditIcon'
    })
  }

  function confirmEditingPersonalData(event: SyntheticEvent) {
    event.preventDefault();
    const data: TMonoTypeObject<string> = {}
    if (user) {
      if (name.value !== user.name) {
        data.name = name.value;
      }
      if (email.value !== user.email) {
        data.email = email.value;
      }
      if (password.value !== '') {
        data.password = password.value;
      }
    }
    // @ts-ignore
    dispatch(editUser(data));
    finishEditingPersonalData();
  }


  return (
    <>
      <form className={styles.form}>
        <UserFormInput input={name} placeholder='Имя' onClick={startEditingPersonalData}  icon={icons.name}/>
        <UserFormInput input={email} placeholder='Логин' onClick={startEditingPersonalData}  icon={icons.email}/>
        <UserFormInput input={password} placeholder='Пароль' onClick={startEditingPersonalData}  icon={icons.password}/>
        {
          isEditButtonsShown && (
            <div className={styles.buttonsWrapper}>
              <Button onClick={cancelEditingPersonalData} htmlType="button" type="secondary" size="medium">
                Отмена
              </Button>
              <Button onClick={confirmEditingPersonalData} htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )
        }
      </form>
      <p className={`${styles.description} text text_type_main-small mt-4`}>
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </>

  )
}