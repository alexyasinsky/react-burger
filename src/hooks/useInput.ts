import React, {useState} from "react";


type TUseInputProps = {
    name: string;
    defaultValue?: string;
}

export type TUseInput = {
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function useInput(input: TUseInputProps): TUseInput {
    const [value, setValue] = useState<string>(input.defaultValue || '');

    return {
        name: input.name,
        value,
        setValue,
    }
}