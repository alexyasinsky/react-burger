import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';
import {cart} from "../../db/cart";


const initialState = {
 ingredientsList: [],
 cart: cart,
 currentIngredient: null,
 order: null
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredientsList = [...action.payload.data];
    })
  },
}) 

const { actions, reducer } = ingredientsSlice;

export const { setCurrentIngredient } = actions;

export default reducer;