import {ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import store from "./index";
import {TOrderActions} from "./order/reducers";
import {TUserActions} from "./user/reducers";
import {TBurgerConstructorActions} from "./burger-constructor/reducers";
import {TBurgerIngredientsActions} from "./burger-ingredients/reducers";


export type AppActions =
  TOrderActions |
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TUserActions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, any, AppActions>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;