import {useState} from "react";

export default function useInputNew(input) {

  const [value, setValue] = useState(input.defaultValue || '');

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