import styles from "./form.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef} from "react";

export default function Form({inputs, handleSubmit, submitTitle}) {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {
        inputs.map((input, ind) => {
          return (
            <Input
              key={ind}
              ref={ind === 0 ? inputRef : null}
              value={input.value}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              onChange={(e) => input.setValue(e.target.value)}
              extraClass='mb-6'
              icon={input.icon}
              onIconClick={input.onIconClick}
            />
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