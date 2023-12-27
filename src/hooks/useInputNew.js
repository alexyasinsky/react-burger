import {useState} from "react";


export default function useInputNew(
  input,
  placeholder = '',
  icon = '',
  onIconClick = () => {}
) {

  const [value, setValue] = useState('');

  let type;

  switch (input) {
    case 'email' || 'password':
      type = input;
      break;
    default:
      type = 'text'
  }


  return {
    name: input,
    value,
    setValue,
    placeholder,
    type,
    icon,
    onIconClick
  }
}