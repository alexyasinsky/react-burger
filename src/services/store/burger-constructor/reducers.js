import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

const initialState = {
  bun: null,
  fillings: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addFilling: (state, action) => {
      const fillingItem = {...action.payload};
      fillingItem.constructorId = uuid();
      state.fillings.push(fillingItem);
    },
    removeFilling: (state, action) => {
      state.fillings.splice(action.payload, 1);
    },
    clearConstructorState: (state) => {
      state.bun = null;
      state.fillings = [];
    },
    sortFilling: (state, action) => {
      state.fillings.splice(action.payload.from, 1);
      state.fillings.splice(action.payload.to, 0, action.payload.item);
    }
  },
  selectors: {
    selectBun: state => state.bun,
    selectFillings: state => state.fillings
  }
})

const {reducer, selectors, actions} = burgerConstructorSlice;

export const {setBun, addFilling, removeFilling, clearConstructorState, sortFilling} = actions;
export const {selectBun, selectFillings} = selectors;
export default reducer;
