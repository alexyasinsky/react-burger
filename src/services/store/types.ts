import {ThunkDispatch} from "@reduxjs/toolkit";
import store from "./index";
import {TOrderActions} from "./order/reducers";
import {TUserActions} from "./user/reducers";
import {TBurgerConstructorActions} from "./burger-constructor/reducers";
import {TBurgerIngredientsActions} from "./burger-ingredients/reducers";
import {TProfileOrdersActions} from "./profile-orders/actions";
import {TFeedOrdersActions} from "./feed-orders/actions";


export type AppActions =
  TOrderActions |
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TUserActions |
  TProfileOrdersActions |
  TFeedOrdersActions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, any, AppActions>
