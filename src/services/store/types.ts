import {ThunkDispatch} from "@reduxjs/toolkit";
import store from "./index";
import {TOrderActions} from "./order/reducers";
import {TUserActions} from "./user/reducers";
import {TBurgerConstructorActions} from "./burger-constructor/reducers";
import {TBurgerIngredientsActions} from "./burger-ingredients/reducers";
import {TOrdersActions} from "./orders/actions";


export type AppActions =
  TOrderActions |
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TUserActions | TOrdersActions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, any, AppActions>
