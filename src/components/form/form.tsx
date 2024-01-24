import styles from "./form.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, JSX, SyntheticEvent, useEffect, useRef} from "react";
import {TUseInput} from "../../hooks/useInputs";

type TFormProps = {
  inputs: Array<TUseInput>,
  handleSubmit: (event: SyntheticEvent) => void
  submitTitle: string
}
export default function Form({inputs, handleSubmit, submitTitle} : TFormProps) : JSX.Element {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(inputRef && inputRef.current) {
      inputRef.current.focus();
    }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => input.setValue(e.target.value)}
              extraClass='mb-6'
              icon={input.icon}
              onIconClick={input.onIconClick}
            />
          )
        })
      }
      {submitTitle &&
        (
          <Button htmlType="submit" type="primary" size="medium">
            {submitTitle}
          </Button>
        )
      }

    </form>
  )
}
