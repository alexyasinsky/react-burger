import React, {useState} from "react";
import {TInput} from "../utils/types";

export type TUseInput = Omit<TInput & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}, 'defaultValue'>

export function useInput(input: TInput): TUseInput {

  const [value, setValue] = useState<string>(input.defaultValue || '');

  return {
    name: input.name,
    value,
    setValue,
    placeholder: input.placeholder || '',
    type: input.type || 'text',
    icon: input.icon || undefined,
    onIconClick: input.onIconClick || undefined
  }
}

export function usePasswordInput(input: TInput): TUseInput {

  const [value, setValue] = useState<string>(input.defaultValue || '');
  const [fieldType, setFieldType] = useState<"text" | "email" | "password">('password');

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