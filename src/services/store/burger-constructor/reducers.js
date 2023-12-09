import {cart} from "../../db/cart";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  filling: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addFilling: (state, action) => {
      state.filling.push(action.payload);
    }
  },
  selectors: {
    selectBun: state => state.bun,
    selectFilling: state => state.filling
  }
})

const {reducer, selectors, actions} = burgerConstructorSlice;

export const {setBun, addFilling} = actions;
export const {selectBun, selectFilling} = selectors;
export default reducer;
