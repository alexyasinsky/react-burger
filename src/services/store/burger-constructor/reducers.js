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
    },
    removeFilling: (state, action) => {
      state.filling.splice(action.payload, 1);
    }
  },
  selectors: {
    selectBun: state => state.bun,
    selectFilling: state => state.filling
  }
})

const {reducer, selectors, actions} = burgerConstructorSlice;

export const {setBun, addFilling, removeFilling} = actions;
export const {selectBun, selectFilling} = selectors;
export default reducer;
