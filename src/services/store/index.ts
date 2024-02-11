import {combineReducers, configureStore} from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/reducers';
import burgerConstructor from './burger-constructor/reducers';
import order from './order/reducers';
import user from './user/reducers';
import {OrdersMiddleware} from "./middleware";
import {orders} from "./orders/reducers";


const reducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  order,
  user,
  orders
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(OrdersMiddleware);
  }
})
export default store