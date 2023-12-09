import {cart} from "../../db/cart";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  filling: cart
}

const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState: initialState,
  reducers: {}
})

const {reducer} = burgerConstructorSlice;
export default reducer;
