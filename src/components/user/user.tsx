import styles from "./user.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {JSX, SyntheticEvent, useEffect, useState} from "react";
import {editUser, getUser} from "../../services/store/user/actions";
import {selectUser} from "../../services/store/user/reducers";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {TMonoTypeObject, TUser} from "../../utils/types";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";


type TUserIcons = {
  [name: string] : keyof TICons | undefined
}

export default function User(): JSX.Element {

  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const user: TUser | null = useSelector(selectUser);

  const [name, setName] = useState<string>(user ? user['name'] : '');
  const [email, setEmail] = useState<string>(user ? user['email'] : '');
  const [password, setPassword] = useState<string>('');

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
    setName(user ? user['name'] : '');
    setEmail(user ? user['email'] : '');
    setPassword('');
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
      if (name !== user.name) {
        data.name = name;
      }
      if (email !== user.email) {
        data.email = email;
      }
      if (password !== '') {
        data.password = password;
      }
    }
    // @ts-ignore
    dispatch(editUser(data));
    finishEditingPersonalData();
  }


  return (
    <>
      <form className={styles.form}>
        <Input
          value={name}
          placeholder='Имя'
          type='text'
          name='name'
          onChange={(e) => setName(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass='mb-6'
          icon={icons.name}
        >
        </Input>
        <Input
          value={email}
          placeholder='Логин'
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass='mb-6'
          icon={icons.email}
        >
        </Input>
        <Input
          value={password}
          placeholder='Пароль'
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          onClick={startEditingPersonalData}
          extraClass='mb-6'
          icon={icons.password}
        >
        </Input>
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