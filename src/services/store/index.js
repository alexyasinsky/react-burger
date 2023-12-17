import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/reducers';
import burgerConstructor from './burger-constructor/reducers';
import currentIngredient from './current-ingredient/reducers';
import order from './order/reducers';


export const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    currentIngredient,
    order
  }
}) 