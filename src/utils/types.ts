import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: string;
    fat: string;
    carbohydrates: string;
    calories: string;
    price: string;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: string;
    constructorExtraType: 'bun' | 'filling';
}

export type TUser = {
    name: string;
    email: string;
    password?: string;
}

export type TMonoTypeObject<T> = {
    [name: string]: T
}
