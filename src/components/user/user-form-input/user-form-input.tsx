import {TUseInput} from "../../../hooks/useInput";
import {ChangeEvent, JSX, SyntheticEvent} from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";


type TUserFormInputProps = {
    input: TUseInput;
    type?: "text" | "email" | "password";
    placeholder?: string;
    onClick: (event: SyntheticEvent) => void;
    icon: keyof TICons | undefined;

}

export default function UserFormInput({input, type='text', placeholder, onClick, icon}: TUserFormInputProps): JSX.Element {
    return (
        <Input
            name={input.name}
            value={input.value}
            placeholder={placeholder}
            type={type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => input.setValue(e.target.value)}
            onClick={onClick}
            extraClass='mb-6'
            icon={icon}
        />
    )
}