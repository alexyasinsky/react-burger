import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients, postOrder } from './actions';
import {cart} from "../../db/cart";


const initialState = {
  loading: false,
  error: false,
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
    clearOrder: (state) => {
      state.order = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredientsList = [...action.payload.data];
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.order = {...action.payload}
    })
  },

}) 

const { actions, reducer } = ingredientsSlice;

export const { setCurrentIngredient, clearOrder } = actions;

export default reducer;