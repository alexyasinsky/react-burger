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
    },
    clearConstructorState: (state) => {
      state.bun = null;
      state.filling = [];
    }
  },
  selectors: {
    selectBun: state => state.bun,
    selectFilling: state => state.filling
  }
})

const {reducer, selectors, actions} = burgerConstructorSlice;

export const {setBun, addFilling, removeFilling, clearConstructorState} = actions;
export const {selectBun, selectFilling} = selectors;
export default reducer;
