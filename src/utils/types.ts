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

export type TFillingIngredient = TIngredient & {
    constructorId: number;
}

export type TIngredientFromApi = Pick<TIngredient, 'constructorExtraType'>

export type TUser = {
    name: string;
    email: string;
    password?: string;
}

export type TMonoTypeObject<T> = {
    [name: string]: T
}

export type TOrder = {
    ingredients: Array<string>,
    _id: string;
    status: 'pending' | 'done' | 'created' | 'cancelled';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}