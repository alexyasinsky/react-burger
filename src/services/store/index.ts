import {combineReducers, configureStore} from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/reducers';
import burgerConstructor from './burger-constructor/reducers';
import order from './order/reducers';
import user from './user/reducers';
import feedOrders from './feed-orders/reducers';
import profileOrders from "./profile-orders/reducers";
import {profileOrdersMiddleware} from "./profile-orders/actions";
import {feedOrdersMiddleware} from "./feed-orders/actions";


const reducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  order,
  user,
  profileOrders,
  feedOrders
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(profileOrdersMiddleware, feedOrdersMiddleware);
  }
})
export default store