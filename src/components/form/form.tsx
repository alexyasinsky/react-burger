import styles from "./form.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, JSX, ReactNode, SyntheticEvent, useEffect, useRef} from "react";

type TFormProps = {
    handleSubmit: (event: SyntheticEvent) => void
    submitTitle: string,
    children: ReactNode,
}
export default function Form({children, handleSubmit, submitTitle}: TFormProps): JSX.Element {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {children}
            <Button htmlType="submit" type="primary" size="medium">
                {submitTitle}
            </Button>
        </form>
    )
}
