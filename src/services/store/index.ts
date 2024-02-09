import {configureStore} from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/reducers';
import burgerConstructor from './burger-constructor/reducers';
import order from './order/reducers';
import user from './user/reducers';


const store = configureStore({
  reducer : {
    burgerIngredients,
    burgerConstructor,
    order,
    user
  }
})
export default store