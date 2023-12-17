import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.scss';
import {useEffect, useRef} from "react";

export default function ({fields, handleSubmit, submitTitle}) {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {
        fields.map((setter, ind) => {
          return (
            <Input
              key={ind}
              ref={ind === 0 ? inputRef : null}
              value={setter.value}
              type="text"
              placeholder={setter.placeholder}
              name={setter.name}
              onChange={setter.handler}
              extraClass='mb-6'
              icon={setter.icon}
              onIconClick={setter.onIconClick}
            ></Input>
          )
        })
      }
      {handleSubmit &&
        (
          <Button htmlType="submit" type="primary" size="medium">
            {submitTitle}
          </Button>
        )
      }
    </form>
  )
}