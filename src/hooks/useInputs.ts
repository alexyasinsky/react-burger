import {useState} from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type TUseInput = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | undefined;
  icon?: keyof TICons | undefined;
  onIconClick?: () => void | null;
}

export function useInput(input: TUseInput) {

  const [value, setValue] = useState<string>(input.defaultValue || '');

  return {
    name: input.name,
    value,
    setValue,
    placeholder: input.placeholder || '',
    type: input.type || 'text',
    icon: input.icon || '',
    onIconClick: input.onIconClick || null
  }
}

type TUsePasswordInput = {
  defaultValue?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | undefined;
  icon?: keyof TICons | undefined;
  onIconClick?: () => void | null;
}
export function usePasswordInput(input: TUsePasswordInput) {

  const [value, setValue] = useState(input.defaultValue || '');
  const [fieldType, setFieldType] = useState('password');

  return {
    name: 'password',
    value,
    setValue,
    placeholder: input.placeholder || '',
    type: fieldType,
    icon: 'ShowIcon',
    onIconClick: () => setFieldType(fieldType === 'password' ? 'text' : 'password')
  }
}